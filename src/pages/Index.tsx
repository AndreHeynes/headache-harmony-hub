
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CookieConsent } from "@/components/compliance/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
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
            <Link to="/" className="text-neutral-900 font-medium">Home</Link>
            <Link to="/learn-more" className="text-neutral-600 hover:text-neutral-900">Learn More</Link>
            <Link to="/pricing" className="text-neutral-600 hover:text-neutral-900">Pricing</Link>
            <Link to="/policy" className="text-neutral-600 hover:text-neutral-900">Policies</Link>
            <Link to="/support" className="text-neutral-600 hover:text-neutral-900">Support</Link>
            <Link to="/dashboard" className="text-neutral-600 hover:text-neutral-900">Dashboard</Link>
          </nav>
          <button className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

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
                  <Button className="bg-neutral-900 text-white px-8 py-3 rounded-lg hover:bg-neutral-800">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-neutral-700 text-white px-8 py-3 rounded-lg hover:bg-neutral-600">Sign Up</Button>
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

      <footer className="bg-neutral-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link to="/learn-more#story" className="text-neutral-600 hover:text-neutral-900">Our Story</Link></li>
                <li><Link to="/learn-more#team" className="text-neutral-600 hover:text-neutral-900">Team</Link></li>
                <li><Link to="/support#careers" className="text-neutral-600 hover:text-neutral-900">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/support" className="text-neutral-600 hover:text-neutral-900">Help Center</Link></li>
                <li><Link to="/policy" className="text-neutral-600 hover:text-neutral-900">Privacy</Link></li>
                <li><Link to="/policy?tab=terms" className="text-neutral-600 hover:text-neutral-900">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><Link to="/support#contact" className="text-neutral-600 hover:text-neutral-900">Email Us</Link></li>
                <li><Link to="/support#contact" className="text-neutral-600 hover:text-neutral-900">Phone</Link></li>
                <li><Link to="/support#contact" className="text-neutral-600 hover:text-neutral-900">Office</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <CookieConsent />
    </div>
  );
};

export default Index;
