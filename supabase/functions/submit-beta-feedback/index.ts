import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, feedback_type, title, description, rating, page_url } = await req.json();

    // Validate required fields
    if (!token) {
      console.log('No token provided');
      return new Response(
        JSON.stringify({ error: 'Token is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!feedback_type || !title || !description) {
      console.log('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'feedback_type, title, and description are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate feedback_type
    const validTypes = ['bug', 'feature', 'usability', 'general'];
    if (!validTypes.includes(feedback_type)) {
      console.log('Invalid feedback_type:', feedback_type);
      return new Response(
        JSON.stringify({ error: 'Invalid feedback type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate rating if provided
    if (rating !== null && rating !== undefined) {
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        console.log('Invalid rating:', rating);
        return new Response(
          JSON.stringify({ error: 'Rating must be between 1 and 5' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Create Supabase client with service role for full access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Validate the token first
    console.log('Validating token before accepting feedback');
    
    const { data: signup, error: lookupError } = await supabase
      .from('beta_signups')
      .select('id, email, name, status, approved_at')
      .eq('id', token)
      .eq('status', 'approved')
      .maybeSingle();

    if (lookupError) {
      console.error('Database error during token validation:', lookupError);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!signup) {
      console.log('Invalid token - user not found or not approved');
      return new Response(
        JSON.stringify({ error: 'Invalid or expired access token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if token is expired (30 days from approval)
    const approvedAt = new Date(signup.approved_at);
    const expiresAt = new Date(approvedAt.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    if (new Date() > expiresAt) {
      console.log('Token expired');
      return new Response(
        JSON.stringify({ error: 'Your access token has expired' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert the feedback
    console.log('Inserting feedback from:', signup.email);
    
    const { data: feedback, error: insertError } = await supabase
      .from('beta_feedback')
      .insert({
        beta_user_email: signup.email,
        beta_user_name: signup.name,
        feedback_type,
        title,
        description,
        rating: rating || null,
        page_url: page_url || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting feedback:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to submit feedback' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Feedback submitted successfully:', feedback.id);
    
    return new Response(
      JSON.stringify({ success: true, id: feedback.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Feedback submission error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
