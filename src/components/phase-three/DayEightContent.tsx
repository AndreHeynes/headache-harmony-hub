
import React from "react";
import QuestionnaireOutcomeFeedback from "@/components/questionnaire/QuestionnaireOutcomeFeedback";
import HeadacheAnalysis from "@/components/phase/HeadacheAnalysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ActivitySquare, 
  Lightbulb, 
  Brain, 
  Gauge, 
  ScrollText, 
  ArrowRight
} from "lucide-react";

interface DayEightContentProps {
  allCompleted: boolean;
  questionnaireResults: Record<string, any>;
}

const DayEightContent: React.FC<DayEightContentProps> = ({
  allCompleted,
  questionnaireResults
}) => {
  console.log("DayEightContent - allCompleted:", allCompleted);
  console.log("DayEightContent - questionnaireResults:", questionnaireResults);

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
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100">
        <h3 className="font-semibold text-xl text-indigo-900 mb-2">Your Recovery Journey Summary</h3>
        <p className="text-indigo-800 mb-4">
          Congratulations on completing the 3-month headache management program! Here's a summary of your progress.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
            <div className="flex items-center mb-2">
              <TrendingDown className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-medium text-gray-900">Headache Frequency</h4>
            </div>
            <p className="text-3xl font-bold text-green-600">-75%</p>
            <p className="text-sm text-gray-600">Reduction since program start</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
            <div className="flex items-center mb-2">
              <TrendingDown className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-medium text-gray-900">Headache Severity</h4>
            </div>
            <p className="text-3xl font-bold text-green-600">-57%</p>
            <p className="text-sm text-gray-600">Reduction in intensity</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-gray-900">Functional Improvement</h4>
            </div>
            <p className="text-3xl font-bold text-blue-600">+62%</p>
            <p className="text-sm text-gray-600">Daily activity improvement</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-medium text-lg mb-4">Outcome</h3>
        <div className="space-y-5">
          {/* HIT-6 Interpretation */}
          <div className="rounded-lg border p-5 bg-emerald-50 border-emerald-200">
            <div className="flex items-start">
              <div className="mr-4">
                <Gauge className="h-8 w-8 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2 text-emerald-800">
                  Headache Impact
                </h3>
                <p className="text-neutral-700">
                  Your headaches currently have a mild to moderate impact on your daily activities.
                </p>
              </div>
            </div>
          </div>
          
          {/* MIDAS Interpretation */}
          <div className="rounded-lg border p-5 bg-blue-50 border-blue-200">
            <div className="flex items-start">
              <div className="mr-4">
                <ActivitySquare className="h-8 w-8 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2 text-blue-800">
                  Migraine Disability Assessment
                </h3>
                <p className="text-neutral-700">
                  Your migraines are causing mild disability. Your program has helped minimize this impact.
                </p>
              </div>
            </div>
          </div>
          
          {/* GPOC Interpretation */}
          <div className="rounded-lg border p-5 bg-blue-50 border-blue-200">
            <div className="flex items-start">
              <div className="mr-4">
                <ArrowRight className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2 text-blue-800">
                  Global Perception of Change
                </h3>
                <p className="text-neutral-700">
                  You've noticed moderate improvements in your headache condition since beginning treatment.
                </p>
              </div>
            </div>
          </div>
          
          {/* PSFS Interpretation */}
          <div className="rounded-lg border p-5 bg-emerald-50 border-emerald-200">
            <div className="flex items-start">
              <div className="mr-4">
                <Lightbulb className="h-8 w-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2 text-emerald-800">
                  Patient-Specific Functional Scale
                </h3>
                <p className="text-neutral-700">
                  Your ability to perform the key activities you identified has improved significantly during the program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayEightContent;
