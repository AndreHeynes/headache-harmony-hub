import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <p className="text-sm text-neutral-600 mb-4">
              Founded by a physiotherapist with over two decades of experience in managing primary headache disorders. Our mission is to empower individuals to understand and manage their headache condition.
            </p>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-neutral-600 hover:text-neutral-900">About the Program</Link></li>
              <li><Link to="/story" className="text-neutral-600 hover:text-neutral-900">Our Story</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <p className="text-sm text-neutral-600 mb-4">
              Need assistance? Our Help Center is here to guide you. Find answers to frequently asked questions, learn how to use our features, and get in touch with our support team.
            </p>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-neutral-600 hover:text-neutral-900">Help Center</Link></li>
              <li><Link to="/policy" className="text-neutral-600 hover:text-neutral-900">Privacy & Terms</Link></li>
              <li><Link to="/support#contact" className="text-neutral-600 hover:text-neutral-900">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <p className="text-sm text-neutral-600 mb-4">
              Join our community of headache warriors on their journey to recovery. Share experiences, find support, and stay updated with the latest resources and tips.
            </p>
            <div className="flex space-x-4 mt-4">
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

export default Footer;
