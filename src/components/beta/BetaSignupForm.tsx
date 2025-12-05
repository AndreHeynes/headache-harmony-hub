import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const betaSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  hasDiagnosisConfirmation: z.boolean().refine(val => val === true, {
    message: "You must confirm your diagnosis by a specialist"
  }),
  currentApproach: z.string().optional(),
  goalsExpectations: z.string().optional(),
  acceptedBetaTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the beta testing terms"
  }),
  acceptedPrivacyPolicy: z.boolean().refine(val => val === true, {
    message: "You must acknowledge the privacy policy"
  }),
  acceptedFeedbackCommitment: z.boolean().refine(val => val === true, {
    message: "You must agree to provide feedback"
  }),
});

type BetaSignupValues = z.infer<typeof betaSignupSchema>;

interface BetaSignupFormProps {
  onSuccess?: () => void;
}

export const BetaSignupForm = ({ onSuccess }: BetaSignupFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<BetaSignupValues>({
    resolver: zodResolver(betaSignupSchema),
    defaultValues: {
      email: "",
      name: "",
      hasDiagnosisConfirmation: false,
      currentApproach: "",
      goalsExpectations: "",
      acceptedBetaTerms: false,
      acceptedPrivacyPolicy: false,
      acceptedFeedbackCommitment: false,
    },
  });

  const onSubmit = async (values: BetaSignupValues) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("beta_signups").insert({
        email: values.email.toLowerCase().trim(),
        name: values.name.trim(),
        has_diagnosis_confirmation: values.hasDiagnosisConfirmation,
        current_approach: values.currentApproach?.trim() || null,
        goals_expectations: values.goalsExpectations?.trim() || null,
        accepted_beta_terms: values.acceptedBetaTerms,
        accepted_privacy_policy: values.acceptedPrivacyPolicy,
        accepted_feedback_commitment: values.acceptedFeedbackCommitment,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already Registered",
            description: "This email is already registered for beta testing.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setIsSubmitted(true);
      localStorage.setItem("beta_signup_submitted", "true");
      
      toast({
        title: "Welcome to the Beta Program!",
        description: "We'll notify you when beta testing begins.",
      });

      onSuccess?.();
    } catch (error) {
      console.error("Beta signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">You're In!</h3>
        <p className="text-muted-foreground">
          We'll notify you when beta testing begins. Check your email for updates.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasDiagnosisConfirmation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I confirm I have been diagnosed with a Primary Headache Disorder by a Specialist Medical Practitioner *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentApproach"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Management Approach (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your current headache management methods..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goalsExpectations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goals & Expectations (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What do you hope to achieve from this program?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3 pt-4 border-t">
          <FormField
            control={form.control}
            name="acceptedBetaTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    I accept the beta testing terms and understand this is a pre-release version *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptedPrivacyPolicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    I acknowledge the privacy policy and consent to data collection *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptedFeedbackCommitment"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    I commit to providing feedback during the beta testing period *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Join Beta Program"
          )}
        </Button>
      </form>
    </Form>
  );
};
