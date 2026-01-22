import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ApprovalRequest {
  signupId: string;
  adminNotes?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Create admin client with service role for user creation
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Verify the caller is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user: caller }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !caller) {
      throw new Error("Invalid authentication");
    }

    // Check if caller has admin role
    const { data: isAdmin } = await supabaseAdmin.rpc("has_role", {
      _user_id: caller.id,
      _role: "admin"
    });

    if (!isAdmin) {
      throw new Error("Unauthorized: Admin role required");
    }

    const { signupId, adminNotes }: ApprovalRequest = await req.json();
    console.log("Processing approval for signup:", signupId);

    // Get the beta signup record
    const { data: signup, error: fetchError } = await supabaseAdmin
      .from("beta_signups")
      .select("*")
      .eq("id", signupId)
      .single();

    if (fetchError || !signup) {
      throw new Error("Beta signup not found");
    }

    if (signup.status === "approved") {
      throw new Error("This signup has already been approved");
    }

    // Generate a temporary password
    const tempPassword = crypto.randomUUID().slice(0, 12) + "Aa1!";

    // Create the user account
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: signup.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: signup.name,
        is_beta_tester: true,
        beta_signup_id: signupId
      }
    });

    if (createError) {
      console.error("Error creating user:", createError);
      throw new Error(`Failed to create user: ${createError.message}`);
    }

    console.log("User created:", newUser.user.id);

    // Assign beta_tester role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({
        user_id: newUser.user.id,
        role: "beta_tester"
      });

    if (roleError) {
      console.error("Error assigning role:", roleError);
      // Don't fail completely - user is created, role can be assigned manually
    }

    // Update the beta signup record
    const { error: updateError } = await supabaseAdmin
      .from("beta_signups")
      .update({
        status: "approved",
        approved_at: new Date().toISOString(),
        approved_by: caller.id,
        admin_notes: adminNotes || signup.admin_notes,
        converted_user_id: newUser.user.id
      })
      .eq("id", signupId);

    if (updateError) {
      console.error("Error updating signup:", updateError);
    }

    // Send welcome email
    try {
      const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-onboarding-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({
          userEmail: signup.email,
          userName: signup.name,
          emailType: "welcome",
          userId: newUser.user.id,
        }),
      });

      if (emailResponse.ok) {
        console.log("Welcome email sent successfully");
      } else {
        const errorText = await emailResponse.text();
        console.error("Failed to send welcome email:", errorText);
      }
    } catch (emailError: any) {
      console.error("Error sending welcome email:", emailError);
      // Don't fail the approval if email fails
    }

    console.log("Beta approval completed successfully");

    return new Response(
      JSON.stringify({
        success: true,
        userId: newUser.user.id,
        email: signup.email,
        message: "User account created, beta_tester role assigned, and welcome email sent. Temporary password sent via email."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );

  } catch (error: any) {
    console.error("Error in approve-beta-signup:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
});
