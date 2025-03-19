
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

const PhaseOne = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 7;
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  
  // Load completed questionnaires from localStorage
  useEffect(() => {
    const loadCompletedQuestionnaires = () => {
      const questionnaires = [
        'hit-6', 'fht', 'psfs', 'mkq', 'midas', 'psc', 'hsloc', 'hses', 'hb'
      ];
      
      const completed: Record<string, boolean> = {};
      
      questionnaires.forEach(id => {
        const savedResponse = localStorage.getItem(`questionnaire-${id}`);
        if (savedResponse) {
          completed[id] = true;
        }
      });
      
      setCompletedQuestionnaires(completed);
    };
    
    loadCompletedQuestionnaires();
    
    // Add event listener for storage changes (in case user completes questionnaire in another tab)
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
            <p>Review your progress so far and make note of any patterns or trends in your symptoms. Complete today's questionnaires.</p>
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
          <div className="space-y-4">
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
