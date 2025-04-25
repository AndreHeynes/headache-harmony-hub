import React from "react";
import { Book, Heart, Award } from "lucide-react";
import Footer from "@/components/layout/Footer";
import MainHeader from "@/components/layout/MainHeader";

const Story = () => {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Main Content */}
      <main className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4" id="story">Our Story</h1>
            <div className="flex justify-center mb-6">
              <Book className="h-12 w-12 text-neutral-800" />
            </div>
          </div>
          
          <div className="prose max-w-none">
            <div className="mb-8">
              <p className="text-lg mb-4">
                I'm a physiotherapist/physical therapist with over two decades of experience 
                helping people manage complex pain conditions, especially Primary Headache Disorders. 
                But the story of Recover from Headache, Reclaim Your Life! doesn't begin in a 
                clinic—it begins at home.
              </p>
              
              <p className="mb-4">
                As a university student, I watched someone close to me struggle with chronic headaches. 
                The most surprising change didn't come from a new medication, but from simple 
                advice and movement strategies. Her headache frequency didn't disappear overnight—but 
                her life started changing. Her relationships, energy, and self-belief slowly began to return.
              </p>
              
              <p className="mb-4">
                That experience sparked a lifelong commitment.
              </p>
            </div>
            
            <div className="mb-8">
              <p className="mb-4">
                Over the years, in working with countless clients, one truth became clear: headaches 
                are not just about pain—they're about lost moments, missed opportunities, and emotional strain. 
                And the support available is often scattered, overly medicalized, or incomplete.
              </p>
              
              <p className="mb-4">
                That's why this program was created.
              </p>
              
              <p className="mb-4">
                By drawing on the best available evidence, insights from multiple health disciplines, 
                and years of hands-on clinical practice, I developed a step-by-step program that 
                patients could own. With the right guidance and structure, many people discovered 
                they could manage their condition independently—once they truly understood it.
              </p>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-xl font-medium mb-2">
                This program is for those who are ready to do things differently.
              </p>
              <p className="text-xl font-medium mb-2">
                It's for those who want to regain control.
              </p>
              <p className="text-xl font-medium mb-4">
                And most of all—it's for those who want their life back.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-lg italic">
                You are not alone, and this journey is yours. We're just here to guide the way.
              </p>
              <div className="flex justify-center mt-4">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-10">
            <Link 
              to="/learn-more" 
              className="bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Learn More About Our Program
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Story;
