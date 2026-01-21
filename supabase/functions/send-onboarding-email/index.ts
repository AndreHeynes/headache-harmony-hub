import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";
import { Resend } from "npm:resend@4.0.0";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import React from "npm:react@18.3.1";

// Import email templates
import { WelcomeEmail } from "./_templates/welcome.tsx";
import { DayThreeEmail } from "./_templates/day-three.tsx";
import { WeekOneCompleteEmail } from "./_templates/week-one-complete.tsx";
import { MidpointEmail } from "./_templates/midpoint.tsx";
import { FinalWeekEmail } from "./_templates/final-week.tsx";
import { CompleteEmail } from "./_templates/complete.tsx";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  userEmail: string;
  userName: string;
  emailType: "welcome" | "day-three" | "week-one-complete" | "midpoint" | "final-week" | "complete";
  userId?: string;
  customData?: Record<string, any>;
}

const EMAIL_SUBJECTS: Record<string, string> = {
  "welcome": "Welcome to the Beta Program - You're In! 🎉",
  "day-three": "How's Your First Week Going?",
  "week-one-complete": "Week 1 Complete - Great Progress! 🌟",
  "midpoint": "Halfway There - Your Progress Matters 💪",
  "final-week": "Final Week - Time to See Your Progress",
  "complete": "Congratulations - You Did It! 🏆",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(resendApiKey);
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { userEmail, userName, emailType, userId, customData }: EmailRequest = await req.json();
    
    console.log(`Sending ${emailType} email to ${userEmail}`);

    // Check if this email was already sent (prevent duplicates)
    const { data: existingLog } = await supabaseAdmin
      .from("email_logs")
      .select("id")
      .eq("user_email", userEmail)
      .eq("email_type", emailType)
      .single();

    if (existingLog) {
      console.log(`Email ${emailType} already sent to ${userEmail}, skipping`);
      return new Response(
        JSON.stringify({ success: true, message: "Email already sent", skipped: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Render the appropriate email template
    let html: string;
    const templateProps = { userName, userEmail, ...customData };

    switch (emailType) {
      case "welcome":
        html = await renderAsync(React.createElement(WelcomeEmail, templateProps));
        break;
      case "day-three":
        html = await renderAsync(React.createElement(DayThreeEmail, templateProps));
        break;
      case "week-one-complete":
        html = await renderAsync(React.createElement(WeekOneCompleteEmail, templateProps));
        break;
      case "midpoint":
        html = await renderAsync(React.createElement(MidpointEmail, templateProps));
        break;
      case "final-week":
        html = await renderAsync(React.createElement(FinalWeekEmail, templateProps));
        break;
      case "complete":
        html = await renderAsync(React.createElement(CompleteEmail, templateProps));
        break;
      default:
        throw new Error(`Unknown email type: ${emailType}`);
    }

    // Send the email
    const { data: emailResult, error: sendError } = await resend.emails.send({
      from: "Recover & Reclaim <noreply@recoverfromheadachereclaimyourlife.org>",
      to: [userEmail],
      subject: EMAIL_SUBJECTS[emailType],
      html,
    });

    if (sendError) {
      console.error("Error sending email:", sendError);
      
      // Log the failed attempt
      await supabaseAdmin.from("email_logs").insert({
        user_id: userId || null,
        user_email: userEmail,
        email_type: emailType,
        status: "failed",
        error_message: sendError.message,
      });
      
      throw new Error(`Failed to send email: ${sendError.message}`);
    }

    console.log("Email sent successfully:", emailResult?.id);

    // Log successful email
    await supabaseAdmin.from("email_logs").insert({
      user_id: userId || null,
      user_email: userEmail,
      email_type: emailType,
      resend_id: emailResult?.id,
      status: "sent",
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully",
        resendId: emailResult?.id 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in send-onboarding-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
