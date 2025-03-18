
import { useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "@/components/auth/SignUpForm";
import SocialAuth from "@/components/auth/SocialAuth";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-gray-500 mt-2">Join MigraineTracker to manage your headaches effectively</p>
        </div>

        <SignUpForm isLoading={isLoading} setIsLoading={setIsLoading} />

        <SocialAuth isLoading={isLoading} setIsLoading={setIsLoading} mode="signup" />

        <p className="text-center mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-medium text-primary hover:text-primary/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
