
import { Task } from "@/types/task";
import { CompletedQuestionnairesMap } from "./types";

/**
 * Generates tasks for Phase 1 based on day number and completed questionnaires
 */
export const getPhaseOneTasks = (
  day: number,
  completedQuestionnaires: CompletedQuestionnairesMap = {}
): Task[] => {
  // Special tasks for day 1
  if (day === 1) {
    return [
      { 
        id: 1, 
        title: "Read the Phase 1 guide", 
        status: "not-started",
        type: "document",
        link: "/documents/phase-one-guide"
      },
      { 
        id: 2, 
        title: "Watch the Phase 1 introduction video", 
        status: "not-started",
        type: "video",
        link: "/phase-one/video"
      }
    ];
  }
  
  // Day 2 - Initial questionnaires
  else if (day === 2) {
    return [
      { 
        id: 1, 
        title: "FHT Questionnaire", 
        status: completedQuestionnaires['fht'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['fht'] ? undefined : "/questionnaire/fht",
        questionnaire: "fht"
      },
      { 
        id: 2, 
        title: "HIT-6 Questionnaire", 
        status: completedQuestionnaires['hit-6'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['hit-6'] ? undefined : "/questionnaire/hit-6",
        questionnaire: "hit-6"
      },
      { 
        id: 3, 
        title: "MKQ Questionnaire", 
        status: completedQuestionnaires['mkq'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['mkq'] ? undefined : "/questionnaire/mkq",
        questionnaire: "mkq"
      },
      { 
        id: 4, 
        title: "PSFS Questionnaire", 
        status: completedQuestionnaires['psfs'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['psfs'] ? undefined : "/questionnaire/psfs",
        questionnaire: "psfs"
      }
    ];
  }
  
  // Day 3
  else if (day === 3) {
    return [
      { 
        id: 1, 
        title: "FHT Questionnaire", 
        status: completedQuestionnaires['fht'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['fht'] ? undefined : "/questionnaire/fht",
        questionnaire: "fht"
      },
      { 
        id: 2, 
        title: "MIDAS Questionnaire", 
        status: completedQuestionnaires['midas'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['midas'] ? undefined : "/questionnaire/midas",
        questionnaire: "midas"
      },
      { 
        id: 3, 
        title: "PSFS Questionnaire", 
        status: completedQuestionnaires['psfs'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['psfs'] ? undefined : "/questionnaire/psfs",
        questionnaire: "psfs"
      },
      { 
        id: 4, 
        title: "MKQ Questionnaire", 
        status: completedQuestionnaires['mkq'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['mkq'] ? undefined : "/questionnaire/mkq",
        questionnaire: "mkq"
      }
    ];
  }
  
  // Day 4
  else if (day === 4) {
    return [
      { 
        id: 1, 
        title: "HIT-6 Questionnaire", 
        status: completedQuestionnaires['hit-6'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['hit-6'] ? undefined : "/questionnaire/hit-6",
        questionnaire: "hit-6"
      },
      { 
        id: 2, 
        title: "MIDAS Questionnaire", 
        status: completedQuestionnaires['midas'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['midas'] ? undefined : "/questionnaire/midas",
        questionnaire: "midas"
      },
      { 
        id: 3, 
        title: "PSC Questionnaire", 
        status: completedQuestionnaires['psc'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['psc'] ? undefined : "/questionnaire/psc",
        questionnaire: "psc"
      },
      { 
        id: 4, 
        title: "MKQ Questionnaire", 
        status: completedQuestionnaires['mkq'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['mkq'] ? undefined : "/questionnaire/mkq",
        questionnaire: "mkq"
      }
    ];
  }
  
  // Day 5
  else if (day === 5) {
    return [
      { 
        id: 1, 
        title: "PSFS Questionnaire", 
        status: completedQuestionnaires['psfs'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['psfs'] ? undefined : "/questionnaire/psfs",
        questionnaire: "psfs"
      },
      { 
        id: 2, 
        title: "HSLOC Questionnaire", 
        status: completedQuestionnaires['hsloc'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['hsloc'] ? undefined : "/questionnaire/hsloc",
        questionnaire: "hsloc"
      },
      { 
        id: 3, 
        title: "PSC Questionnaire", 
        status: completedQuestionnaires['psc'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['psc'] ? undefined : "/questionnaire/psc",
        questionnaire: "psc"
      },
      { 
        id: 4, 
        title: "MKQ Questionnaire", 
        status: completedQuestionnaires['mkq'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['mkq'] ? undefined : "/questionnaire/mkq",
        questionnaire: "mkq"
      }
    ];
  }
  
  // Day 6
  else if (day === 6) {
    return [
      { 
        id: 1, 
        title: "HSES Questionnaire", 
        status: completedQuestionnaires['hses'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['hses'] ? undefined : "/questionnaire/hses",
        questionnaire: "hses"
      },
      { 
        id: 2, 
        title: "HB Questionnaire", 
        status: completedQuestionnaires['hb'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['hb'] ? undefined : "/questionnaire/hb",
        questionnaire: "hb"
      }
    ];
  }
  
  // Day 7
  else if (day === 7) {
    return [
      { 
        id: 1, 
        title: "HSES Questionnaire", 
        status: completedQuestionnaires['hses'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['hses'] ? undefined : "/questionnaire/hses",
        questionnaire: "hses"
      },
      { 
        id: 2, 
        title: "HSLOC Questionnaire", 
        status: completedQuestionnaires['hsloc'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['hsloc'] ? undefined : "/questionnaire/hsloc",
        questionnaire: "hsloc"
      },
      { 
        id: 3, 
        title: "HB Questionnaire", 
        status: completedQuestionnaires['hb'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['hb'] ? undefined : "/questionnaire/hb",
        questionnaire: "hb"
      },
      { 
        id: 4, 
        title: "PSC Questionnaire", 
        status: completedQuestionnaires['psc'] ? "completed" : "not-started",
        type: "questionnaire",
        link: completedQuestionnaires['psc'] ? undefined : "/questionnaire/psc",
        questionnaire: "psc"
      }
    ];
  } else {
    return [];
  }
};
