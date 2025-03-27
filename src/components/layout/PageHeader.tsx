
import React from "react";
import { Link } from "react-router-dom";

const PageHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/37b87337-8892-418a-932d-e700a3a4568d.png" 
            alt="Recover From Headache Logo" 
            className="w-10 h-10"
          />
          <span className="text-xl text-neutral-800">Recover & Reclaim</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="text-neutral-600 hover:text-neutral-900">Dashboard</Link>
          <Link to="/profile" className="text-neutral-600 hover:text-neutral-900">Profile</Link>
        </nav>
        <button className="md:hidden">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default PageHeader;
