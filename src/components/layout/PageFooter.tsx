
import React from "react";
import { Link } from "react-router-dom";

const PageFooter = () => {
  return (
    <footer className="bg-neutral-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link to="/learn-more#story" className="text-neutral-600 hover:text-neutral-900">Our Story</Link></li>
              <li><Link to="/learn-more#team" className="text-neutral-600 hover:text-neutral-900">Team</Link></li>
              <li><Link to="/support#careers" className="text-neutral-600 hover:text-neutral-900">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-neutral-600 hover:text-neutral-900">Help Center</Link></li>
              <li><Link to="/policy" className="text-neutral-600 hover:text-neutral-900">Privacy</Link></li>
              <li><Link to="/policy?tab=terms" className="text-neutral-600 hover:text-neutral-900">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><Link to="/support#contact" className="text-neutral-600 hover:text-neutral-900">Email Us</Link></li>
              <li><Link to="/support#contact" className="text-neutral-600 hover:text-neutral-900">Phone</Link></li>
              <li><Link to="/support#contact" className="text-neutral-600 hover:text-neutral-900">Office</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Follow Us</h4>
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
  );
};

export default PageFooter;
