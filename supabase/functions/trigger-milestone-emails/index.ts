import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Milestone definitions (days since approval)
const MILESTONES = {
  "day-three": 3,
  "week-one-complete": 7,
  "midpoint": 42, // Week 6
  "final-week": 78, // Week 12 start (day 78 = start of week 12)
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    console.log("Checking for milestone emails to send...");

    // Get all approved beta signups with their approval dates
    const { data: approvedSignups, error: fetchError } = await supabaseAdmin
      .from("beta_signups")
      .select("id, email, name, approved_at, converted_user_id")
      .eq("status", "approved")
      .not("approved_at", "is", null);

    if (fetchError) {
      console.error("Error fetching signups:", fetchError);
      throw new Error(`Failed to fetch signups: ${fetchError.message}`);
    }

    if (!approvedSignups || approvedSignups.length === 0) {
      console.log("No approved signups found");
      return new Response(
        JSON.stringify({ success: true, message: "No signups to process", emailsSent: 0 }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Found ${approvedSignups.length} approved signups to check`);

    const now = new Date();
    const emailsToSend: Array<{ email: string; name: string; userId: string | null; emailType: string }> = [];

    for (const signup of approvedSignups) {
      const approvedAt = new Date(signup.approved_at);
      const daysSinceApproval = Math.floor((now.getTime() - approvedAt.getTime()) / (1000 * 60 * 60 * 24));

      // Check each milestone
      for (const [emailType, targetDay] of Object.entries(MILESTONES)) {
        // Only send if we're on or past the target day
        if (daysSinceApproval >= targetDay) {
          // Check if already sent
          const { data: existingLog } = await supabaseAdmin
            .from("email_logs")
            .select("id")
            .eq("user_email", signup.email)
            .eq("email_type", emailType)
            .single();

          if (!existingLog) {
            emailsToSend.push({
              email: signup.email,
              name: signup.name,
              userId: signup.converted_user_id,
              emailType,
            });
          }
        }
      }
    }

    console.log(`Found ${emailsToSend.length} emails to send`);

    // Send each email by calling the send-onboarding-email function
    let sentCount = 0;
    const errors: string[] = [];

    for (const emailInfo of emailsToSend) {
      try {
        const response = await fetch(`${supabaseUrl}/functions/v1/send-onboarding-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${serviceRoleKey}`,
          },
          body: JSON.stringify({
            userEmail: emailInfo.email,
            userName: emailInfo.name,
            emailType: emailInfo.emailType,
            userId: emailInfo.userId,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          if (!result.skipped) {
            sentCount++;
            console.log(`Sent ${emailInfo.emailType} email to ${emailInfo.email}`);
          }
        } else {
          const errorText = await response.text();
          errors.push(`Failed to send ${emailInfo.emailType} to ${emailInfo.email}: ${errorText}`);
          console.error(`Failed to send ${emailInfo.emailType} to ${emailInfo.email}:`, errorText);
        }
      } catch (error: any) {
        errors.push(`Error sending ${emailInfo.emailType} to ${emailInfo.email}: ${error.message}`);
        console.error(`Error sending ${emailInfo.emailType} to ${emailInfo.email}:`, error);
      }
    }

    console.log(`Successfully sent ${sentCount} emails`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${approvedSignups.length} signups, sent ${sentCount} emails`,
        emailsSent: sentCount,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in trigger-milestone-emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
