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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Lock, User, MapPin, ArrowRight } from "lucide-react";
import { countries } from "@/lib/countries";
import { supabase } from "@/integrations/supabase/client";

const signUpSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100)
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  country: z.string().min(1, { message: "Please select your country" }),
  rememberMe: z.boolean().optional(),
});

type SignUpValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const SignUpForm = ({ isLoading, setIsLoading }: SignUpFormProps) => {
  const navigate = useNavigate();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      country: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignUpValues) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            country: data.country,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("An account with this email already exists");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (authData.user) {
        toast.success("Account created! Redirecting to dashboard...");
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="Your name"
                    aria-label="Full name"
                    autoComplete="name"
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
                    placeholder="Min 8 chars, 1 uppercase, 1 number" 
                    type="password"
                    aria-label="Password"
                    autoComplete="new-password"
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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10" aria-label="Select country">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

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
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          aria-label="Create account"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
