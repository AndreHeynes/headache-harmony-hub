
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PhaseThreeContentProps {
  day: number;
}

const PhaseThreeContent: React.FC<PhaseThreeContentProps> = ({ day }) => {
  // Content for each day
  const getDayContent = (day: number) => {
    switch (day) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Welcome to Phase 3</h3>
            <p>
              Welcome to Phase 3 of your recovery journey. This week focuses on 
              consolidating the progress you've made and preparing for long-term 
              maintenance of your gains.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Today's Focus: Assessment</h4>
              <p>
                Today, we'll reassess your current status using the same 
                questionnaires from Phase 1. This will help us measure your 
                progress and adjust your maintenance plan accordingly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">HIT-6 Assessment</h3>
                <p className="text-neutral-500 mb-3">
                  Complete the Headache Impact Test to measure how headaches affect your daily activities.
                </p>
                <Link to="/questionnaire/hit-6">
                  <Button variant="outline" className="w-full">Complete HIT-6</Button>
                </Link>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">MIDAS Assessment</h3>
                <p className="text-neutral-500 mb-3">
                  Evaluate the impact of headaches on your work, home, and social life.
                </p>
                <Link to="/questionnaire/midas">
                  <Button variant="outline" className="w-full">Complete MIDAS</Button>
                </Link>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">PSFS Assessment</h3>
                <p className="text-neutral-500 mb-3">
                  Rate your ability to perform the specific activities you identified in Phase 1.
                </p>
                <Link to="/questionnaire/psfs">
                  <Button variant="outline" className="w-full">Complete PSFS</Button>
                </Link>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Global Perception of Change</h3>
                <p className="text-neutral-500 mb-3">
                  Rate your overall perception of change since beginning the program.
                </p>
                <Link to="/questionnaire/gpoc">
                  <Button variant="outline" className="w-full">Complete GPOC</Button>
                </Link>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Progress Review</h3>
            <p>
              Today we'll review your progress throughout the program. We'll examine 
              your initial assessments compared to your current status and identify 
              the areas where you've made the most improvement.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Today's Focus: Analysis</h4>
              <p>
                We'll analyze your headache frequency, intensity, and duration 
                changes from the beginning of the program. This will help us identify 
                which interventions have been most effective for you.
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Maintaining Your Progress</h3>
            <p>
              Today we'll focus on developing a sustainable plan to maintain the 
              progress you've made. We'll identify the key exercises and habits 
              that have been most beneficial for you.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Today's Focus: Maintenance Planning</h4>
              <p>
                You'll learn how to create a personalized maintenance routine that 
                fits into your daily life and helps prevent headache recurrence.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Trigger Management</h3>
            <p>
              Today we'll refine your trigger management strategies based on what 
              you've learned about your specific headache triggers throughout the program.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Today's Focus: Personalized Trigger Management</h4>
              <p>
                You'll create a personalized trigger management plan that takes into 
                account your unique triggers and effective avoidance or coping strategies.
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Relapse Prevention</h3>
            <p>
              Today we'll focus on strategies to prevent relapse and recognize early 
              warning signs that your headaches might be returning or worsening.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Today's Focus: Warning Signs</h4>
              <p>
                You'll learn to identify your personal warning signs and develop a 
                stepped response plan to address symptoms before they escalate.
              </p>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Self-Advocacy</h3>
            <p>
              Today we'll discuss how to effectively communicate with healthcare 
              providers about your headache condition and advocate for your needs.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Today's Focus: Communication Skills</h4>
              <p>
                You'll learn strategies for clearly describing your symptoms, 
                asking effective questions, and participating actively in treatment decisions.
              </p>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Next Steps</h3>
            <p>
              Congratulations on completing Phase 3! Today we'll summarize what you've 
              learned and prepare you for the ongoing maintenance phase of your recovery.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Today's Focus: Transition to Self-Management</h4>
              <p>
                You now have the tools, knowledge, and skills to manage your headache 
                condition independently. We'll outline your personalized ongoing maintenance 
                plan and discuss resources for continued support.
              </p>
            </div>
            <div className="mt-6 p-4 border border-green-200 bg-green-50 rounded-md">
              <h4 className="font-medium text-green-800 mb-2">Phase 3 Complete!</h4>
              <p className="text-green-700">
                You've successfully completed Phase 3. You're now ready to move on to the 
                final phase of the program, where you'll implement your long-term maintenance plan.
              </p>
            </div>
          </div>
        );
      default:
        return <p>Content for this day is not available.</p>;
    }
  };

  return (
    <div className="space-y-4">
      {getDayContent(day)}
    </div>
  );
};

export default PhaseThreeContent;
