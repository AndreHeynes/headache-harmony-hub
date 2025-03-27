
import React from "react";
import { Link } from "react-router-dom";

const PolicyFooter: React.FC = () => {
  return (
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
              <Link to="/policy" className="text-neutral-900 font-medium">Privacy & Terms</Link>
              <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Contact</a></li>
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
  );
};

export default PolicyFooter;
