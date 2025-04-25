import React from "react";
import { Card } from "@/components/ui/card";
import { Brain, Heart, Users, AlertCircle } from "lucide-react";
import Footer from "@/components/layout/Footer";
import MainHeader from "@/components/layout/MainHeader";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      
      {/* Main content */}
      <main className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" id="about">About the Program</h1>
            <h2 className="text-2xl mb-6">Recover from Headache, Reclaim your Life!</h2>
          </div>

          <div className="prose max-w-none mb-12">
            <p className="text-lg mb-6">
              Headache is more than pain — it's a burden that can alter how you live, work, and connect with others. 
              But here's the good news: if you've been diagnosed with a Primary Headache Disorder, 
              you're not alone — and you're not without options.
            </p>
            
            <Card className="p-6 mb-8 bg-neutral-50">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="mr-2 h-6 w-6 text-neutral-700" />
                This Program Is For You If:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You've been diagnosed with a Primary Headache Disorder (e.g. migraine, tension-type headache, cluster headache) by a qualified healthcare professional</li>
                <li>You're ready to better understand and manage your experience</li>
                <li>You want to regain control over your health, lifestyle, and relationships</li>
              </ul>
            </Card>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
              <div className="flex">
                <AlertCircle className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Important:</h4>
                  <p>This program is not a diagnostic tool.
                  Headache is a symptom, not a diagnosis. If you have not yet received a formal diagnosis of a Primary Headache Disorder, 
                  we strongly encourage you to consult a medical doctor. If your headache is caused by a Secondary Headache Disorder 
                  (e.g., tumor, infection, or vascular disease), it requires urgent and specific medical treatment. 
                  This program cannot assist with secondary causes.</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Why We Exist</h3>
            <p className="mb-4">
              Our mission is to empower you with the skills and tools needed to self-manage your primary 
              headache disorder — and to reclaim the quality of life that headaches have taken from you.
            </p>

            <p className="mb-4">
              We work with individuals who are tired of:
            </p>

            <ul className="list-disc pl-6 mb-6">
              <li>Constantly missing out on social activities</li>
              <li>Struggling to stay active or healthy</li>
              <li>Over-relying on medications</li>
              <li>Feeling isolated or misunderstood</li>
              <li>Questioning their ability to cope</li>
            </ul>

            <p className="text-lg font-medium">
              We're here to guide you through a structured, empowering process. Not to "fix" you — 
              but to help you take back what headaches have disrupted.
            </p>
          </div>
          
          <div className="flex justify-center mt-8 mb-12">
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

export default About;
