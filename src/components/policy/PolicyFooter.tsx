
import React from "react";
import { Link } from "react-router-dom";

const PolicyFooter: React.FC = () => {
  return (
    <footer className="bg-neutral-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="mb-4">About</h4>
            <p className="text-sm text-neutral-600 mb-4">
              We are dedicated to providing you with the tools and resources you need to manage your health and well-being. Our mission is to empower you with knowledge and support on your journey to a healthier life.
            </p>
          </div>
          <div>
            <h4 className="mb-4">Our Story</h4>
            <p className="text-sm text-neutral-600 mb-4">
              Our story began with a passion for helping people. We saw a need for accessible and personalized health solutions, and we set out to create a platform that would make a difference. We are committed to innovation and excellence in everything we do.
            </p>
          </div>
          <div>
            <h4 className="mb-4">Help Center</h4>
            <p className="text-sm text-neutral-600 mb-4">
              Need assistance? Our Help Center is here to guide you. Find answers to frequently asked questions, learn how to use our features, and get in touch with our support team. We're here to help you every step of the way.
            </p>
            <Link to="/policy" className="text-neutral-900 font-medium">Privacy & Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PolicyFooter;
