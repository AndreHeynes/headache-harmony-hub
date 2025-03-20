
import React from "react";
import QuestionnaireOutcomeFeedback from "@/components/questionnaire/QuestionnaireOutcomeFeedback";
import HeadacheAnalysis from "@/components/phase/HeadacheAnalysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, ChevronRight, TrendingDown, ExternalLink } from "lucide-react";

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
        <QuestionnaireOutcomeFeedback questionnaireResults={questionnaireResults} />
      </div>
      
      <Card className="border-green-100 bg-green-50">
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg text-green-800 mb-3">Maintenance Recommendations</h3>
          <div className="space-y-3">
            <div className="flex">
              <ChevronRight className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-green-800">Continue your personalized exercise routine 3-4 times per week</p>
            </div>
            <div className="flex">
              <ChevronRight className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-green-800">Maintain regular sleep schedule and stress management practices</p>
            </div>
            <div className="flex">
              <ChevronRight className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-green-800">Continue tracking headaches using the connected app</p>
            </div>
            <div className="flex">
              <ChevronRight className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-green-800">Schedule follow-up assessment in 3 months</p>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <p className="text-green-800 font-medium">Moving to Phase 4: Long-term Maintenance</p>
            <ArrowRight className="h-5 w-5 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DayEightContent;
