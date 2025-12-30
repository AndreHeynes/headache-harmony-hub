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
    const { token, product } = await req.json();

    if (!token) {
      console.log('No token provided');
      return new Response(
        JSON.stringify({ valid: false, error: 'Token is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate product is one of the allowed values
    const validProducts = ['app', 'program'];
    if (product && !validProducts.includes(product)) {
      console.log('Invalid product:', product);
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid product specified' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role for full access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Look up the beta signup by token (assuming token is stored in a column)
    // For this implementation, we'll use the id as the token
    console.log('Validating token for product:', product || 'any');
    
    const { data: signup, error: lookupError } = await supabase
      .from('beta_signups')
      .select('*')
      .eq('id', token)
      .eq('status', 'approved')
      .maybeSingle();

    if (lookupError) {
      console.error('Database error:', lookupError);
      return new Response(
        JSON.stringify({ valid: false, error: 'Database error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!signup) {
      console.log('Token not found or not approved');
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid or unapproved access token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if token is expired (if approved_at + 30 days < now)
    const approvedAt = new Date(signup.approved_at);
    const expiresAt = new Date(approvedAt.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
    const now = new Date();

    if (now > expiresAt) {
      console.log('Token expired:', { approvedAt, expiresAt, now });
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Your access token has expired. Please request a new one.',
          expired: true
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build user response
    const user = {
      id: signup.id,
      email: signup.email,
      full_name: signup.name,
      fullName: signup.name, // For compatibility
      product: product || 'program',
      status: signup.status,
      token_expires_at: expiresAt.toISOString(),
    };

    console.log('Token valid for user:', user.email);
    
    return new Response(
      JSON.stringify({ valid: true, user }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Validation error:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
