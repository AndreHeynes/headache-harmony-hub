
import { useToast } from "@/hooks/use-toast";

export const usePhaseThreeToasts = () => {
  const { toast } = useToast();
  
  const showIncompletionToast = () => {
    toast({
      title: "Assessments Incomplete",
      description: "Please complete all assessments before proceeding to view your feedback.",
      variant: "destructive"
    });
  };
  
  const showQuestionnairesReminderToast = (incompleteQuestionnaires: string[]) => {
    toast({
      title: "Incomplete Assessments",
      description: `Please complete the following assessments before proceeding to Day 8: ${incompleteQuestionnaires.join(', ')}`,
      variant: "default"
    });
  };
  
  const showCompletionToast = () => {
    toast({
      title: "Phase 3 Complete!",
      description: "Congratulations on completing Phase 3! You're now ready to move to Phase 4.",
    });
  };
  
  return { 
    showIncompletionToast, 
    showQuestionnairesReminderToast, 
    showCompletionToast 
  };
};
