
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
      default:
        return <ArrowRight className="h-8 w-8 text-blue-500" />;
    }
  };
  
  return (
    <Card className="mt-8 shadow-md border border-neutral-200">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b pb-4">
        <CardTitle className="text-xl text-indigo-900">Phase 1 Assessment Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <p className="text-neutral-700">
          Based on your questionnaire responses, we've identified key areas to address 
          in your personalized headache management program:
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
                    Headache Impact Level
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
                      "Your migraines are causing mild disability. Your Phase 2 program will include strategies to minimize this impact." :
                      questionnaireResults['midas'].score <= 20 ?
                      "Your migraines are causing moderate disability. We'll focus on reducing this impact in Phase 2." :
                      "Your migraines are causing significant disability in your daily life. Phase 2 will prioritize strategies to reduce this burden."}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* HSLOC Interpretation */}
          {questionnaireResults['hsloc'] && questionnaireResults['hsloc'].groupScores && (
            <div className="rounded-lg border p-5 bg-cyan-50 border-cyan-200">
              <div className="flex items-start">
                <div className="mr-4">
                  {getIconForCategory('hsloc')}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2 text-cyan-800">
                    Perception of Control
                  </h3>
                  <p className="text-neutral-700">
                    {questionnaireResults['hsloc'].groupScores.dominant === 'internal' ? 
                      "You believe you have personal control over your headaches. Phase 2 will focus on strengthening this with self-management techniques." : 
                      questionnaireResults['hsloc'].groupScores.dominant === 'healthcare' ?
                      "You see healthcare professionals as key to managing your headaches. We'll help you develop more personal control strategies." :
                      "You tend to view your headaches as influenced by chance. We'll work on developing a greater sense of control."}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* PSC Interpretation */}
          {questionnaireResults['psc'] && questionnaireResults['psc'].groupScores && (
            <div className="rounded-lg border p-5 bg-amber-50 border-amber-200">
              <div className="flex items-start">
                <div className="mr-4">
                  {getIconForCategory('psc')}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2 text-amber-800">
                    Readiness for Change
                  </h3>
                  <p className="text-neutral-700">
                    {Object.entries(questionnaireResults['psc'].groupScores)
                      .filter(([key, _]) => !['dominant'].includes(key) && typeof _ === 'number' && _ > 0)
                      .sort(([_, a], [__, b]) => Number(b) - Number(a))
                      .slice(0, 1)
                      .map(([key, _]) => {
                        if (key === 'precontemplation') {
                          return "You're at an early stage of considering change. Phase 2 will help build your motivation.";
                        } else if (key === 'contemplation') {
                          return "You're thinking about making changes. Phase 2 will help you develop specific strategies.";
                        } else if (key === 'action') {
                          return "You're ready to take action. Phase 2 will provide you with specific techniques to implement.";
                        } else if (key === 'maintenance') {
                          return "You're working to maintain changes. Phase 2 will help you refine and strengthen your strategies.";
                        }
                        return "";
                      })[0] || "We'll help you develop strategies appropriate for your current stage of change."}
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
                    Functional Impact
                  </h3>
                  <p className="text-neutral-700">
                    {questionnaireResults['psfs'].savedActivities.length > 0 ? 
                      `We've identified ${questionnaireResults['psfs'].savedActivities.length} key activities that are impacted by your headaches. Your Phase 2 program will address these specific areas.` : 
                      "We'll help you improve your ability to perform daily activities without headache interference."}
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
        
        <div className="p-5 rounded-lg mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-indigo-100">
          <h3 className="font-medium text-lg mb-2 text-indigo-900">Next Steps</h3>
          <p className="text-neutral-700">
            Complete any remaining questionnaires to ensure your Phase 2 program is fully personalized.
            Based on your responses so far, your program will focus on self-management techniques,
            trigger identification, and strategies to reduce headache impact on your daily activities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionnaireOutcomeFeedback;
