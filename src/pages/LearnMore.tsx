
import { Brain, Book, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header - reusing the same header style */}
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
            <Link to="/about" className="text-neutral-600 hover:text-neutral-900">About</Link>
            <Link to="/story" className="text-neutral-600 hover:text-neutral-900">Our Story</Link>
            <Link to="/learn-more" className="text-neutral-900 font-medium">Learn More</Link>
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

            {/* About Section */}
            <div className="mb-16" id="about">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                <Brain className="mr-2 h-6 w-6" />
                About the Program
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-4">
                  Headache is more than pain — it's a burden that can alter how you live, work, and connect with others. 
                  But if you've been diagnosed with a Primary Headache Disorder, you're not alone — and you're not without options.
                </p>
                <p className="text-gray-600 mb-4">
                  Our mission is to empower you with the skills and tools needed to self-manage your primary 
                  headache disorder and to reclaim the quality of life that headaches have taken from you.
                </p>
                <div className="mt-4 text-center">
                  <Button
                    onClick={() => navigate("/about")}
                    variant="outline"
                    className="font-medium rounded-lg transition-all"
                  >
                    Learn More About Us
                  </Button>
                </div>
              </div>
            </div>

            {/* Our Story Section */}
            <div className="mb-16" id="story">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                <Book className="mr-2 h-6 w-6" />
                Our Story
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-4">
                  The story of Recover from Headache, Reclaim Your Life! begins with a physiotherapist with over 
                  two decades of experience helping people manage complex pain conditions, especially Primary Headache Disorders.
                </p>
                <p className="text-gray-600 mb-4">
                  Over the years, one truth became clear: headaches are not just about pain—they're about lost moments, 
                  missed opportunities, and emotional strain. And the support available is often scattered, overly 
                  medicalized, or incomplete.
                </p>
                <div className="mt-4 text-center">
                  <Button
                    onClick={() => navigate("/story")}
                    variant="outline"
                    className="font-medium rounded-lg transition-all"
                  >
                    Read Our Full Story
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl mb-4"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LearnMore;
