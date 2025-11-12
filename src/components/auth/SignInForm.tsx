import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const signInSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(100),
  rememberMe: z.boolean().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const SignInForm = ({ isLoading, setIsLoading }: SignInFormProps) => {
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInValues) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please confirm your email before signing in");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (authData.user) {
        toast.success("Welcome back!");
        // Wait for session to be persisted before navigating
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = form.getValues("email");
    if (!email || !z.string().email().safeParse(email).success) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset email sent! Check your inbox.");
        setShowForgotPassword(false);
      }
    } catch (error) {
      toast.error("Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="your.email@example.com" 
                    type="email"
                    aria-label="Email address"
                    autoComplete="email"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="••••••••" 
                    type="password"
                    aria-label="Password"
                    autoComplete="current-password"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="rememberMe"
                    aria-label="Remember me"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="rememberMe">
                    Remember me
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <button 
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-medium text-primary hover:text-primary/80"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          aria-label="Sign in"
        >
          {isLoading ? "Signing In..." : "Sign In"}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
