
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header - reusing the same header style */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-neutral-800" />
            <span className="text-xl text-neutral-800">MigraineTracker</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-neutral-600 hover:text-neutral-900">Home</a>
            <a href="/learn-more" className="text-neutral-900 font-medium">Learn More</a>
            <a href="#" className="text-neutral-600 hover:text-neutral-900">Features</a>
            <a href="#" className="text-neutral-600 hover:text-neutral-900">Contact</a>
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
      <main className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Program Overview */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">3-Month Headache Management Program</h1>
              <p className="text-lg text-gray-600">A comprehensive approach to understanding and managing your headache disorders</p>
            </div>

            {/* Program Phases */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">Phase 1: Impact Assessment</h3>
                <p className="text-gray-600">A streamlined assessment process to understand how headaches affect your daily life. We use a simple, step-by-step approach with just 1-3 questions per screen to make it easy and stress-free to share your experience.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">Phase 2: Daily Management</h3>
                <p className="text-gray-600">Engage in structured daily activities, exercises, and tracking to build effective self-management habits.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">Phase 3: Progress Review</h3>
                <p className="text-gray-600">Complete follow-up assessments to measure your progress and adjust your program accordingly.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">Phase 4: Maintenance</h3>
                <p className="text-gray-600">Create your personalized maintenance program based on the exercises that work best for you.</p>
              </motion.div>
            </div>

            {/* Key Features */}
            <div className="bg-white p-8 rounded-lg shadow-sm mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Program Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-semibold mb-2">User-Friendly Assessment</h4>
                    <p className="text-gray-600">Simple, focused questions presented one at a time to reduce overwhelm</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-semibold mb-2">Progress Tracking</h4>
                    <p className="text-gray-600">Monitor your improvement with detailed analytics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-semibold mb-2">Personalized Program</h4>
                    <p className="text-gray-600">Tailored exercises based on your assessment results</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-semibold mb-2">Step-by-Step Guidance</h4>
                    <p className="text-gray-600">Clear, manageable steps throughout your journey</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Button
                onClick={() => navigate("/register")}
                size="lg"
                className="px-8 py-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Create Your Account
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
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

export default LearnMore;
