
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ActivitySquare, 
  Lightbulb, 
  Brain, 
  Gauge, 
  ScrollText, 
  ArrowRight
} from "lucide-react";

interface QuestionnaireOutcomeFeedbackProps {
  questionnaireResults: Record<string, any>;
}

const QuestionnaireOutcomeFeedback: React.FC<QuestionnaireOutcomeFeedbackProps> = ({
  questionnaireResults,
}) => {
  const hasResults = Object.keys(questionnaireResults).length > 0;
  
  // Color mapping based on scores
  const getColorForImpactLevel = (score: number, type: string) => {
    if (type === 'hit-6') {
      return score <= 49 ? "bg-emerald-50 border-emerald-200" : 
             score <= 55 ? "bg-amber-50 border-amber-200" : 
             "bg-rose-50 border-rose-200";
    } else if (type === 'midas') {
      return score <= 5 ? "bg-emerald-50 border-emerald-200" : 
             score <= 10 ? "bg-blue-50 border-blue-200" : 
             score <= 20 ? "bg-amber-50 border-amber-200" : 
             "bg-rose-50 border-rose-200";
    }
    return "bg-blue-50 border-blue-200"; // default
  };
  
  const getTextColorForImpactLevel = (score: number, type: string) => {
    if (type === 'hit-6') {
      return score <= 49 ? "text-emerald-800" : 
             score <= 55 ? "text-amber-800" : 
             "text-rose-800";
    } else if (type === 'midas') {
      return score <= 5 ? "text-emerald-800" : 
             score <= 10 ? "text-blue-800" : 
             score <= 20 ? "text-amber-800" : 
             "text-rose-800";
    }
    return "text-blue-800"; // default
  };
  
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'hit-6':
        return <Gauge className="h-8 w-8 text-indigo-500" />;
      case 'midas':
        return <ActivitySquare className="h-8 w-8 text-purple-500" />;
      case 'hsloc':
        return <Brain className="h-8 w-8 text-cyan-500" />;
      case 'psc':
        return <ScrollText className="h-8 w-8 text-amber-500" />;
      case 'psfs':
        return <Lightbulb className="h-8 w-8 text-emerald-500" />;
      case 'gpoc':
        return <ArrowRight className="h-8 w-8 text-blue-500" />;
      default:
        return <ArrowRight className="h-8 w-8 text-blue-500" />;
    }
  };
  
  return (
    <Card className="mt-8 shadow-md border border-neutral-200">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b pb-4">
        <CardTitle className="text-xl text-indigo-900">Outcome</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <p className="text-neutral-700">
          Based on your questionnaire responses, we've identified key areas that have changed 
          during your headache management program:
        </p>
        
        <div className="space-y-5 mt-6">
          {/* HIT-6 Interpretation */}
          {questionnaireResults['hit-6'] && (
            <div className={`rounded-lg border p-5 ${getColorForImpactLevel(questionnaireResults['hit-6'].score, 'hit-6')}`}>
              <div className="flex items-start">
                <div className="mr-4">
                  {getIconForCategory('hit-6')}
                </div>
                <div>
                  <h3 className={`font-medium text-lg mb-2 ${getTextColorForImpactLevel(questionnaireResults['hit-6'].score, 'hit-6')}`}>
                    Headache Impact
                  </h3>
                  <p className="text-neutral-700">
                    {questionnaireResults['hit-6'].score < 50 ? 
                      "Your headaches currently have a mild to moderate impact on your daily activities." : 
                      "Your headaches are substantially impacting your daily life and activities."}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* MIDAS Interpretation */}
          {questionnaireResults['midas'] && (
            <div className={`rounded-lg border p-5 ${getColorForImpactLevel(questionnaireResults['midas'].score, 'midas')}`}>
              <div className="flex items-start">
                <div className="mr-4">
                  {getIconForCategory('midas')}
                </div>
                <div>
                  <h3 className={`font-medium text-lg mb-2 ${getTextColorForImpactLevel(questionnaireResults['midas'].score, 'midas')}`}>
                    Migraine Disability Assessment
                  </h3>
                  <p className="text-neutral-700">
                    {questionnaireResults['midas'].score <= 5 ? 
                      "Your migraines currently cause little to no disability in your daily life." : 
                      questionnaireResults['midas'].score <= 10 ?
                      "Your migraines are causing mild disability. Your program has helped minimize this impact." :
                      questionnaireResults['midas'].score <= 20 ?
                      "Your migraines are causing moderate disability. We've made progress in reducing this impact." :
                      "Your migraines are causing significant disability in your daily life. We'll continue to work on reducing this burden."}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* GPOC Interpretation */}
          {questionnaireResults['gpoc'] && questionnaireResults['gpoc'].responses && (
            <div className="rounded-lg border p-5 bg-blue-50 border-blue-200">
              <div className="flex items-start">
                <div className="mr-4">
                  {getIconForCategory('gpoc')}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2 text-blue-800">
                    Global Perception of Change
                  </h3>
                  <p className="text-neutral-700">
                    {questionnaireResults['gpoc'].responses && questionnaireResults['gpoc'].responses['gpoc-q1'] <= 3 ? 
                      "You've reported minimal changes in your headache condition since beginning treatment." : 
                      questionnaireResults['gpoc'].responses['gpoc-q1'] <= 5 ?
                      "You've noticed moderate improvements in your headache condition since beginning treatment." :
                      "You've experienced significant improvements in your headache condition since beginning treatment."}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* PSFS Interpretation */}
          {questionnaireResults['psfs'] && questionnaireResults['psfs'].savedActivities && (
            <div className="rounded-lg border p-5 bg-emerald-50 border-emerald-200">
              <div className="flex items-start">
                <div className="mr-4">
                  {getIconForCategory('psfs')}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2 text-emerald-800">
                    Patient-Specific Functional Scale
                  </h3>
                  <p className="text-neutral-700">
                    {questionnaireResults['psfs'].savedActivities.length > 0 ? 
                      `Your ability to perform the ${questionnaireResults['psfs'].savedActivities.length} key activities you identified has improved significantly during the program.` : 
                      "Your functional abilities have improved through the program, enabling better performance of daily activities without headache interference."}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Generic feedback if few questionnaires are completed */}
          {Object.keys(questionnaireResults).length < 3 && (
            <div className="rounded-lg border-2 border-dashed border-blue-200 p-5 bg-blue-50">
              <div className="flex items-start">
                <div className="mr-4">
                  <ArrowRight className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2 text-blue-800">Continue Your Assessment</h3>
                  <p className="text-neutral-700">
                    Complete more questionnaires to receive a more comprehensive assessment of your headache 
                    condition and personalized recommendations.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionnaireOutcomeFeedback;
