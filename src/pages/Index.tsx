import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CookieConsent } from "@/components/compliance/CookieConsent";
import Footer from "@/components/layout/Footer";
import MainHeader from "@/components/layout/MainHeader";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <main className="pt-16">
        <section className="h-[600px] flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <img 
                src="/lovable-uploads/37b87337-8892-418a-932d-e700a3a4568d.png" 
                alt="Recover From Headache Logo" 
                className="w-64 h-64 mx-auto mb-8"
              />
              <h1 className="text-4xl md:text-5xl mb-4 text-neutral-900">Recover from Headache, Reclaim Your Life!</h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8">A personalized journey to understand and manage your headache disorder through skills development and expert-guided exercises</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
                <Link to="/sign-in">
                  <Button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
                <Link to="/sign-in">
                  <Button variant="outline" className="px-8 py-3 rounded-lg">Log In</Button>
                </Link>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link to="/learn-more" className="text-neutral-600 hover:text-neutral-900 inline-flex items-center">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/pricing" className="text-neutral-600 hover:text-neutral-900 inline-flex items-center">
                  View Pricing
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/dashboard" className="text-neutral-600 hover:text-neutral-900 inline-flex items-center">
                  Go to Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
