import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseTaskList from "@/components/phase/PhaseTaskList";
import PhaseTimeline from "@/components/phase/PhaseTimeline";
import PhaseContent from "@/components/phase/PhaseContent";
import ExternalTracking from "@/components/phase/ExternalTracking";
import PhaseHeading from "@/components/phase/PhaseHeading";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PhaseOne = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 7;
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  const [questionnaireResults, setQuestionnaireResults] = useState<Record<string, any>>({});
  
  useEffect(() => {
    const loadCompletedQuestionnaires = () => {
      const questionnaires = [
        'hit-6', 'fht', 'psfs', 'mkq', 'midas', 'psc', 'hsloc', 'hses', 'hb'
      ];
      
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
    
    loadCompletedQuestionnaires();
    
    window.addEventListener('storage', loadCompletedQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadCompletedQuestionnaires);
    };
  }, []);
  
  const renderDayContent = (day: number) => {
    switch (day) {
      case 1:
        return "Please review the description of how Phase 1 functions. A guide to participating in Phase 1.";
      case 2:
        return (
          <div className="space-y-4">
            <p>Please start completing the questionnaires today. These assessments will help us understand your specific situation and create a personalized treatment plan.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {!completedQuestionnaires['hit-6'] && (
                <Link to="/questionnaire/hit-6" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">HIT-6</h3>
                  <p className="text-sm text-neutral-600">Headache Impact Test</p>
                </Link>
              )}
              {!completedQuestionnaires['fht'] && (
                <Link to="/questionnaire/fht" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">FHT</h3>
                  <p className="text-sm text-neutral-600">Familiar Headache Symptoms</p>
                </Link>
              )}
              {!completedQuestionnaires['psfs'] && (
                <Link to="/questionnaire/psfs" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">PSFS</h3>
                  <p className="text-sm text-neutral-600">Patient-Specific Functional Scale</p>
                </Link>
              )}
              {!completedQuestionnaires['mkq'] && (
                <Link to="/questionnaire/mkq" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">MKQ</h3>
                  <p className="text-sm text-neutral-600">Medication Knowledge Quiz</p>
                </Link>
              )}
            </div>
            {Object.keys(completedQuestionnaires).some(id => ['hit-6', 'fht', 'psfs', 'mkq'].includes(id)) && 
              Object.keys(completedQuestionnaires).length < 4 && (
              <p className="text-sm mt-2">You have completed some questionnaires. Continue with the remaining ones.</p>
            )}
            {Object.keys(completedQuestionnaires).filter(id => ['hit-6', 'fht', 'psfs', 'mkq'].includes(id)).length === 4 && (
              <p className="text-sm mt-2 text-green-600">You have completed all questionnaires for today!</p>
            )}
            {Object.keys(completedQuestionnaires).filter(id => ['hit-6', 'fht', 'psfs', 'mkq'].includes(id)).length === 0 && (
              <p className="text-sm mt-2">You can save your progress and complete these questionnaires later if needed.</p>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p>Continue tracking your symptoms and triggers. Today's questionnaires focus on headache impact and disability assessment.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {!completedQuestionnaires['fht'] && (
                <Link to="/questionnaire/fht" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">FHT</h3>
                  <p className="text-sm text-neutral-600">Familiar Headache Symptoms</p>
                </Link>
              )}
              {!completedQuestionnaires['midas'] && (
                <Link to="/questionnaire/midas" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">MIDAS</h3>
                  <p className="text-sm text-neutral-600">Migraine Disability Assessment</p>
                </Link>
              )}
              {!completedQuestionnaires['psfs'] && (
                <Link to="/questionnaire/psfs" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">PSFS</h3>
                  <p className="text-sm text-neutral-600">Patient-Specific Functional Scale</p>
                </Link>
              )}
              {!completedQuestionnaires['mkq'] && (
                <Link to="/questionnaire/mkq" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">MKQ</h3>
                  <p className="text-sm text-neutral-600">Medication Knowledge Quiz</p>
                </Link>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <p>Today's focus is on understanding how your headache affects you, your medication knowledge base, and how ready you are for change. Please complete the following assessments.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {!completedQuestionnaires['hit-6'] && (
                <Link to="/questionnaire/hit-6" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">HIT-6</h3>
                  <p className="text-sm text-neutral-600">Headache Impact Test</p>
                </Link>
              )}
              {!completedQuestionnaires['midas'] && (
                <Link to="/questionnaire/midas" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">MIDAS</h3>
                  <p className="text-sm text-neutral-600">Migraine Disability Assessment</p>
                </Link>
              )}
              {!completedQuestionnaires['psc'] && (
                <Link to="/questionnaire/psc" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">PSC</h3>
                  <p className="text-sm text-neutral-600">Pain Stages of Change</p>
                </Link>
              )}
              {!completedQuestionnaires['mkq'] && (
                <Link to="/questionnaire/mkq" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">MKQ</h3>
                  <p className="text-sm text-neutral-600">Medication Knowledge Quiz</p>
                </Link>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <p>Today we attempt to understand your perception of control over your headache. Complete today's questionnaires.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {!completedQuestionnaires['psfs'] && (
                <Link to="/questionnaire/psfs" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">PSFS</h3>
                  <p className="text-sm text-neutral-600">Patient-Specific Functional Scale</p>
                </Link>
              )}
              {!completedQuestionnaires['hsloc'] && (
                <Link to="/questionnaire/hsloc" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">HSLOC</h3>
                  <p className="text-sm text-neutral-600">Headache-Specific Locus of Control</p>
                </Link>
              )}
              {!completedQuestionnaires['psc'] && (
                <Link to="/questionnaire/psc" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">PSC</h3>
                  <p className="text-sm text-neutral-600">Pain Stages of Change</p>
                </Link>
              )}
              {!completedQuestionnaires['mkq'] && (
                <Link to="/questionnaire/mkq" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">MKQ</h3>
                  <p className="text-sm text-neutral-600">Medication Knowledge Quiz</p>
                </Link>
              )}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <p>Focus on identifying lifestyle factors that may be contributing to your migraines. Complete these final assessments.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {!completedQuestionnaires['hses'] && (
                <Link to="/questionnaire/hses" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">HSES</h3>
                  <p className="text-sm text-neutral-600">Headache Self-Efficacy Scale</p>
                </Link>
              )}
              {!completedQuestionnaires['hb'] && (
                <Link to="/questionnaire/hb" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">HB</h3>
                  <p className="text-sm text-neutral-600">Headache Beliefs</p>
                </Link>
              )}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <p>Complete the final questionnaires for Phase 1. This will help us prepare your personalized program for Phase 2.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {!completedQuestionnaires['hses'] && (
                <Link to="/questionnaire/hses" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">HSES</h3>
                  <p className="text-sm text-neutral-600">Headache Self-Efficacy Scale</p>
                </Link>
              )}
              {!completedQuestionnaires['hsloc'] && (
                <Link to="/questionnaire/hsloc" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">HSLOC</h3>
                  <p className="text-sm text-neutral-600">Headache-Specific Locus of Control</p>
                </Link>
              )}
              {!completedQuestionnaires['hb'] && (
                <Link to="/questionnaire/hb" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">HB</h3>
                  <p className="text-sm text-neutral-600">Headache Beliefs</p>
                </Link>
              )}
              {!completedQuestionnaires['psc'] && (
                <Link to="/questionnaire/psc" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                  <h3 className="font-medium">PSC</h3>
                  <p className="text-sm text-neutral-600">Pain Stages of Change</p>
                </Link>
              )}
            </div>
            
            {/* Feedback card based on completed questionnaires */}
            {Object.keys(completedQuestionnaires).length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-xl">Phase 1 Assessment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-700">
                    Based on your questionnaire responses, we've identified key areas to address in your personalized headache management program:
                  </p>
                  
                  <div className="space-y-5 mt-4">
                    {/* HIT-6 Interpretation */}
                    {questionnaireResults['hit-6'] && (
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium text-lg mb-2">Headache Impact Level</h3>
                        <p className="text-neutral-600">
                          {questionnaireResults['hit-6'].score < 50 ? 
                            "Your headaches currently have a mild to moderate impact on your daily activities." : 
                            "Your headaches are substantially impacting your daily life and activities."}
                        </p>
                      </div>
                    )}
                    
                    {/* MIDAS Interpretation */}
                    {questionnaireResults['midas'] && (
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium text-lg mb-2">Migraine Disability</h3>
                        <p className="text-neutral-600">
                          {questionnaireResults['midas'].score <= 5 ? 
                            "Your migraines currently cause little to no disability in your daily life." : 
                            questionnaireResults['midas'].score <= 10 ?
                            "Your migraines are causing mild disability. Your Phase 2 program will include strategies to minimize this impact." :
                            questionnaireResults['midas'].score <= 20 ?
                            "Your migraines are causing moderate disability. We'll focus on reducing this impact in Phase 2." :
                            "Your migraines are causing significant disability in your daily life. Phase 2 will prioritize strategies to reduce this burden."}
                        </p>
                      </div>
                    )}
                    
                    {/* HSLOC Interpretation */}
                    {questionnaireResults['hsloc'] && questionnaireResults['hsloc'].groupScores && (
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium text-lg mb-2">Perception of Control</h3>
                        <p className="text-neutral-600">
                          {questionnaireResults['hsloc'].groupScores.dominant === 'internal' ? 
                            "You believe you have personal control over your headaches. Phase 2 will focus on strengthening this with self-management techniques." : 
                            questionnaireResults['hsloc'].groupScores.dominant === 'healthcare' ?
                            "You see healthcare professionals as key to managing your headaches. We'll help you develop more personal control strategies." :
                            "You tend to view your headaches as influenced by chance. We'll work on developing a greater sense of control."}
                        </p>
                      </div>
                    )}
                    
                    {/* PSC Interpretation */}
                    {questionnaireResults['psc'] && questionnaireResults['psc'].groupScores && (
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium text-lg mb-2">Readiness for Change</h3>
                        <p className="text-neutral-600">
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
                    )}
                    
                    {/* PSFS Interpretation */}
                    {questionnaireResults['psfs'] && questionnaireResults['psfs'].savedActivities && (
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium text-lg mb-2">Functional Impact</h3>
                        <p className="text-neutral-600">
                          {questionnaireResults['psfs'].savedActivities.length > 0 ? 
                            `We've identified ${questionnaireResults['psfs'].savedActivities.length} key activities that are impacted by your headaches. Your Phase 2 program will address these specific areas.` : 
                            "We'll help you improve your ability to perform daily activities without headache interference."}
                        </p>
                      </div>
                    )}
                    
                    {/* Generic feedback if few questionnaires are completed */}
                    {Object.keys(questionnaireResults).length < 3 && (
                      <div className="rounded-lg border p-4 bg-blue-50">
                        <h3 className="font-medium text-lg mb-2">Continue Your Assessment</h3>
                        <p className="text-neutral-600">
                          Complete more questionnaires to receive a more comprehensive assessment of your headache condition and personalized recommendations.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-neutral-100 p-4 rounded-lg mt-4">
                    <h3 className="font-medium mb-2">Next Steps</h3>
                    <p className="text-neutral-700">
                      Complete any remaining questionnaires to ensure your Phase 2 program is fully personalized.
                      Based on your responses so far, your program will focus on self-management techniques,
                      trigger identification, and strategies to reduce headache impact on your daily activities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
      default:
        return "";
    }
  };

  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <PhaseHeading title="Understanding where you are starting from" />
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousDay}
            disabled={currentDay === 1}
            className="p-2 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={goToNextDay}
            disabled={currentDay === totalDays}
            className="p-2 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CurrentPhaseCard day={currentDay} totalDays={totalDays} />
        <PhaseTaskList 
          day={currentDay} 
          completedQuestionnaires={completedQuestionnaires}
        />
        <PhaseTimeline />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PhaseContent 
          day={currentDay} 
          content={typeof renderDayContent(currentDay) === 'string' 
            ? renderDayContent(currentDay) as string
            : undefined}
          customContent={typeof renderDayContent(currentDay) !== 'string' 
            ? renderDayContent(currentDay) 
            : undefined}
          onNextDay={goToNextDay}
          onPreviousDay={goToPreviousDay}
          totalDays={totalDays}
        />
        <ExternalTracking />
      </div>
    </PageLayout>
  );
};

export default PhaseOne;
