
import { useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";
import SocialAuth from "@/components/auth/SocialAuth";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to your Recover & Reclaim account</p>
        </div>

        <SignInForm isLoading={isLoading} setIsLoading={setIsLoading} />

        <SocialAuth isLoading={isLoading} setIsLoading={setIsLoading} mode="signin" />

        <p className="text-center mt-8 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:text-primary/80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
