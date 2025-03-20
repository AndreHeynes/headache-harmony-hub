
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import QuestionnaireOutcomeFeedback from "@/components/questionnaire/QuestionnaireOutcomeFeedback";

interface PhaseThreeContentProps {
  day: number;
}

const PhaseThreeContent: React.FC<PhaseThreeContentProps> = ({ day }) => {
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  const [questionnaireResults, setQuestionnaireResults] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Load completed questionnaires and results from localStorage
    const loadQuestionnaires = () => {
      const questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
      const completed: Record<string, boolean> = {};
      const results: Record<string, any> = {};
      
      questionnaires.forEach(id => {
        const savedResponse = localStorage.getItem(`questionnaire-${id}`);
        if (savedResponse) {
          completed[id] = true;
          
          try {
            results[id] = JSON.parse(savedResponse);
          } catch (e) {
            console.error(`Error parsing ${id} questionnaire results`);
          }
        }
      });
      
      setCompletedQuestionnaires(completed);
      setQuestionnaireResults(results);
    };
    
    loadQuestionnaires();
    
    // Listen for changes to localStorage
    window.addEventListener('storage', loadQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadQuestionnaires);
    };
  }, []);

  // Common content for days 1-7
  const getDaysOneToSevenContent = () => (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Phase 3 Assessment</h3>
      <p>
        Complete the following questionnaires to help us assess your progress.
        These assessments will help us understand how your condition has changed since the beginning of the program.
      </p>
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-medium mb-2">Today's Focus: Assessment</h4>
        <p>
          These questionnaires will help us measure your progress and adjust your maintenance plan accordingly.
          You have all week to complete these assessments.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {!completedQuestionnaires['hit-6'] && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">HIT-6 Assessment</h3>
            <p className="text-neutral-500 mb-3">
              Complete the Headache Impact Test to measure how headaches affect your daily activities.
            </p>
            <Link to="/questionnaire/hit-6">
              <Button variant="outline" className="w-full">Complete HIT-6</Button>
            </Link>
          </div>
        )}
        
        {!completedQuestionnaires['midas'] && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">MIDAS Assessment</h3>
            <p className="text-neutral-500 mb-3">
              Evaluate the impact of headaches on your work, home, and social life.
            </p>
            <Link to="/questionnaire/midas">
              <Button variant="outline" className="w-full">Complete MIDAS</Button>
            </Link>
          </div>
        )}
        
        {!completedQuestionnaires['psfs'] && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">PSFS Assessment</h3>
            <p className="text-neutral-500 mb-3">
              Rate your ability to perform the specific activities you identified in Phase 1.
            </p>
            <Link to="/questionnaire/psfs">
              <Button variant="outline" className="w-full">Complete PSFS</Button>
            </Link>
          </div>
        )}
        
        {!completedQuestionnaires['gpoc'] && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Global Perception of Change</h3>
            <p className="text-neutral-500 mb-3">
              Rate your overall perception of change since beginning the program.
            </p>
            <Link to="/questionnaire/gpoc">
              <Button variant="outline" className="w-full">Complete GPOC</Button>
            </Link>
          </div>
        )}
        
        {Object.keys(completedQuestionnaires).length === 4 && (
          <div className="col-span-2 p-4 border border-green-200 bg-green-50 rounded-md">
            <h4 className="font-medium text-green-800 mb-2">All Assessments Completed!</h4>
            <p className="text-green-700">
              You've successfully completed all the required assessments. Proceed to Day 8 to view your progress feedback.
            </p>
          </div>
        )}
      </div>
    </div>
  );
  
  // Content for day 8 (feedback)
  const getDayEightContent = () => {
    const allCompleted = Object.keys(completedQuestionnaires).length === 4;
    
    if (!allCompleted) {
      return (
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Progress Review</h3>
          <p>
            Please complete all the required assessments to view your progress feedback.
          </p>
          <div className="bg-amber-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Assessments Incomplete</h4>
            <p>
              You need to complete all assessments before you can view your progress feedback.
              Return to previous days to complete any remaining questionnaires.
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <h3 className="font-medium text-lg">Your Progress Overview</h3>
        <p>
          Based on your assessment results, we've analyzed your progress and developed
          recommendations for your ongoing maintenance plan.
        </p>
        <QuestionnaireOutcomeFeedback questionnaireResults={questionnaireResults} />
      </div>
    );
  };

  // Render content based on day
  if (day >= 1 && day <= 7) {
    return getDaysOneToSevenContent();
  } else if (day === 8) {
    return getDayEightContent();
  } else {
    return <p>Content for this day is not available.</p>;
  }
};

export default PhaseThreeContent;
