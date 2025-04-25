
import { Brain, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"one-time" | "installment">("one-time");
  
  const features = [
    "3-month personalized headache management program",
    "Daily tracking and analytics",
    "Expert-guided exercises and techniques",
    "Progress assessment tools",
    "Community support access"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - updated with logo */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/37b87337-8892-418a-932d-e700a3a4568d.png" 
              alt="Recover From Headache Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl text-neutral-800">Recover & Reclaim</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-neutral-600 hover:text-neutral-900">Home</Link>
            <Link to="/learn-more" className="text-neutral-600 hover:text-neutral-900">Learn More</Link>
            <Link to="/pricing" className="text-neutral-900 font-medium">Pricing</Link>
            <Link to="/policy" className="text-neutral-600 hover:text-neutral-900">Policies</Link>
          </nav>
          <button className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
              <p className="text-lg text-gray-600 mb-8">Choose the payment option that works best for you</p>
              
              <Tabs
                defaultValue="one-time"
                className="w-full max-w-md mx-auto"
                onValueChange={(value) => setBillingCycle(value as "one-time" | "installment")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="one-time">One-time Payment</TabsTrigger>
                  <TabsTrigger value="installment">Installment Plan</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* One-time payment option */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={billingCycle === "one-time" ? "block" : "hidden md:block md:opacity-70"}
              >
                <Card className={`h-full shadow-lg ${billingCycle === "one-time" ? "border-primary" : ""}`}>
                  <CardHeader>
                    <CardTitle className="text-2xl">One-time Payment</CardTitle>
                    <CardDescription>Pay upfront and save</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$249</span>
                      <span className="text-gray-500 ml-2">USD</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      <li className="flex items-start pt-2 text-primary font-semibold">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>Save 10% compared to installment plan</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => navigate("/register")} 
                      className="w-full py-6" 
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Installment plan option */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={billingCycle === "installment" ? "block" : "hidden md:block md:opacity-70"}
              >
                <Card className={`h-full shadow-lg ${billingCycle === "installment" ? "border-primary" : ""}`}>
                  <CardHeader>
                    <CardTitle className="text-2xl">Installment Plan</CardTitle>
                    <CardDescription>Pay monthly</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$89</span>
                      <span className="text-gray-500 ml-2">USD / month</span>
                      <p className="text-sm text-gray-500 mt-1">for 3 months (total $267)</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      <li className="flex items-start pt-2 text-primary font-semibold">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>Lower initial payment</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => navigate("/register")} 
                      className="w-full py-6" 
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>

            {/* Payment Providers Section */}
            <div className="mt-16 text-center">
              <h2 className="text-xl font-semibold mb-6">Secure Payment Processing</h2>
              <div className="flex flex-wrap justify-center items-center gap-8">
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" className="text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Stripe</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" className="text-blue-700">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>PayPal</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" className="text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Wise</span>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                <div>
                  <h3 className="font-semibold text-lg">How does the installment plan work?</h3>
                  <p className="text-gray-600 mt-2">The installment plan divides your payment into 3 equal monthly charges. Your first payment is due today, with the remaining payments automatically charged every 30 days.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Is there a money-back guarantee?</h3>
                  <p className="text-gray-600 mt-2">Yes, we offer a 14-day satisfaction guarantee. If you're not happy with the program, contact our support team for a full refund within the first 14 days.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">What payment methods do you accept?</h3>
                  <p className="text-gray-600 mt-2">We accept all major credit and debit cards, PayPal, and bank transfers through our secure payment processors.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Is my payment information secure?</h3>
                  <p className="text-gray-600 mt-2">Absolutely. We use industry-leading payment processors and never store your credit card information on our servers.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer - reusing the same footer from other pages */}
      <footer className="bg-neutral-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="mb-4">About</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Our Story</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Team</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Help Center</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Privacy</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Email Us</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Phone</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Office</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
