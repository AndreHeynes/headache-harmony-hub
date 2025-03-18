
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PhaseOneGuide = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded-full hover:bg-neutral-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold">Phase 1 Guide: Understanding Where You Are Starting From</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Introduction to Phase 1</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome to Phase 1 of your personalized headache management program. This initial 
            phase is crucial as it helps us understand your unique situation and establish a 
            baseline for your treatment journey.
          </p>
          
          <h3 className="text-lg font-medium mt-4">What to Expect in Phase 1</h3>
          <p>
            Phase 1 lasts for 7 days and focuses on gathering information about your headache 
            patterns, triggers, and impact on your daily life. During this week, you'll:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Complete initial assessment questionnaires</li>
            <li>Track your daily symptoms and potential triggers</li>
            <li>Begin to identify patterns in your headache occurrences</li>
            <li>Establish a baseline for measuring your progress</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Completing the Questionnaires</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            You'll be asked to complete two important questionnaires during Phase 1:
          </p>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>HIT-6 Questionnaire:</strong> The Headache Impact Test measures how 
              headaches affect your daily functioning and quality of life. This will help us 
              understand the severity and impact of your condition.
            </li>
            <li>
              <strong>Headache Type Survey:</strong> This questionnaire helps identify your 
              specific type of headache, which is essential for targeting the right treatment 
              approaches.
            </li>
          </ol>
          <p className="mt-3">
            These questionnaires are designed to be completed in sections, and you can save 
            your progress at any time. There are no right or wrong answers—the most important 
            thing is to respond honestly based on your experience.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Daily Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Consistent tracking during Phase 1 is essential. We recommend:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Recording headache episodes as they occur</li>
            <li>Noting potential triggers (food, stress, sleep patterns, etc.)</li>
            <li>Tracking the effectiveness of any relief measures you try</li>
            <li>Documenting the impact on your daily activities</li>
          </ul>
          <p className="mt-3">
            You can use the tracking tools in this application or connect external tracking 
            apps if you prefer. The key is consistency—even on days when you don't have 
            headaches, logging this information is valuable.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preparing for Phase 2</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            By the end of Phase 1, we'll have gathered enough information to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Establish your headache profile and impact score</li>
            <li>Identify potential triggers and patterns</li>
            <li>Create a personalized plan for Phase 2</li>
          </ul>
          <p className="mt-3">
            The data collected during Phase 1 will directly inform your personalized treatment 
            approach in Phase 2, where we'll begin introducing specific therapeutic 
            interventions based on your unique needs.
          </p>
          <p className="mt-3">
            If you have any questions during Phase 1, please don't hesitate to reach out to 
            your healthcare provider through the support section of this application.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Link 
          to="/phase-one" 
          className="inline-block px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition-colors"
        >
          Return to Phase 1
        </Link>
      </div>
    </PageLayout>
  );
};

export default PhaseOneGuide;
