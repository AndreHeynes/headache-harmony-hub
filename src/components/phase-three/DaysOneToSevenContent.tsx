
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface DaysOneToSevenContentProps {
  completedQuestionnaires: Record<string, boolean>;
}

const DaysOneToSevenContent: React.FC<DaysOneToSevenContentProps> = ({ 
  completedQuestionnaires 
}) => {
  // Check Phase 3 specific completion
  const phase3Questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
  const completedCount = phase3Questionnaires.filter(id => completedQuestionnaires[id]).length;
  const allCompleted = completedCount === 4;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Phase 3 Assessment</h3>
      <p>
        Complete the following questionnaires to help us assess your progress.
        These assessments will help us understand how your condition has changed since the beginning of the program.
      </p>
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
        <h4 className="font-medium mb-2">Today's Focus: Assessment</h4>
        <p>
          These questionnaires will help us measure your progress compared to your Phase 1 baseline and adjust your maintenance plan accordingly.
          You have all week to complete these assessments.
        </p>
        <p className="mt-2 text-sm text-blue-700">
          Progress: {completedCount}/4 questionnaires completed
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className={`border rounded-lg p-4 ${completedQuestionnaires['hit-6'] ? 'bg-emerald-50 border-emerald-200' : ''}`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium mb-2">HIT-6 Assessment</h3>
              <p className="text-neutral-500 mb-3">
                Complete the Headache Impact Test to measure how headaches affect your daily activities.
              </p>
            </div>
            {completedQuestionnaires['hit-6'] && (
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            )}
          </div>
          {!completedQuestionnaires['hit-6'] ? (
            <Link to="/questionnaire/hit-6?phase=3">
              <Button variant="outline" className="w-full">Complete HIT-6</Button>
            </Link>
          ) : (
            <p className="text-sm text-emerald-700">Completed ✓</p>
          )}
        </div>
        
        <div className={`border rounded-lg p-4 ${completedQuestionnaires['midas'] ? 'bg-emerald-50 border-emerald-200' : ''}`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium mb-2">MIDAS Assessment</h3>
              <p className="text-neutral-500 mb-3">
                Evaluate the impact of headaches on your work, home, and social life.
              </p>
            </div>
            {completedQuestionnaires['midas'] && (
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            )}
          </div>
          {!completedQuestionnaires['midas'] ? (
            <Link to="/questionnaire/midas?phase=3">
              <Button variant="outline" className="w-full">Complete MIDAS</Button>
            </Link>
          ) : (
            <p className="text-sm text-emerald-700">Completed ✓</p>
          )}
        </div>
        
        <div className={`border rounded-lg p-4 ${completedQuestionnaires['psfs'] ? 'bg-emerald-50 border-emerald-200' : ''}`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium mb-2">PSFS Assessment</h3>
              <p className="text-neutral-500 mb-3">
                Rate your ability to perform the specific activities you identified in Phase 1.
              </p>
            </div>
            {completedQuestionnaires['psfs'] && (
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            )}
          </div>
          {!completedQuestionnaires['psfs'] ? (
            <Link to="/questionnaire/psfs?phase=3">
              <Button variant="outline" className="w-full">Complete PSFS</Button>
            </Link>
          ) : (
            <p className="text-sm text-emerald-700">Completed ✓</p>
          )}
        </div>
        
        <div className={`border rounded-lg p-4 ${completedQuestionnaires['gpoc'] ? 'bg-emerald-50 border-emerald-200' : ''}`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium mb-2">Global Perception of Change</h3>
              <p className="text-neutral-500 mb-3">
                Rate your overall perception of change since beginning the program.
              </p>
            </div>
            {completedQuestionnaires['gpoc'] && (
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            )}
          </div>
          {!completedQuestionnaires['gpoc'] ? (
            <Link to="/questionnaire/gpoc?phase=3">
              <Button variant="outline" className="w-full">Complete GPOC</Button>
            </Link>
          ) : (
            <p className="text-sm text-emerald-700">Completed ✓</p>
          )}
        </div>
        
        {allCompleted && (
          <div className="col-span-1 md:col-span-2 p-4 border border-emerald-200 bg-emerald-50 rounded-md">
            <h4 className="font-medium text-emerald-800 mb-2">All Assessments Completed!</h4>
            <p className="text-emerald-700">
              You've successfully completed all the required assessments. Proceed to Day 8 to view your progress feedback 
              and compare your results with your Phase 1 baseline.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaysOneToSevenContent;
