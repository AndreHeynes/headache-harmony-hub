
import { Questionnaire } from "@/types/questionnaire";
import { hit6Questionnaire } from "@/data/questionnaires/hit6";
import { fhtQuestionnaire } from "@/data/questionnaires/fht";
import { midasQuestionnaire } from "@/data/questionnaires/midas";
import { hsesQuestionnaire } from "@/data/questionnaires/hses";
import { psfsQuestionnaire } from "@/data/questionnaires/psfs";
import { hslocQuestionnaire } from "@/data/questionnaires/hsloc";
import { hbQuestionnaire } from "@/data/questionnaires/hb";
import { pscQuestionnaire } from "@/data/questionnaires/psc";
import { mkqQuestionnaire } from "@/data/questionnaires/mkq";
import { gpocQuestionnaire } from "@/data/questionnaires/gpoc";

/**
 * Returns the appropriate questionnaire based on the provided ID
 */
export const getQuestionnaire = (id?: string): Questionnaire | null => {
  if (!id) return null;
  
  switch (id) {
    case "hit-6":
      return hit6Questionnaire;
    case "fht":
      return fhtQuestionnaire;
    case "midas":
      return midasQuestionnaire;
    case "hses":
      return hsesQuestionnaire;
    case "psfs":
      return psfsQuestionnaire;
    case "hsloc":
      return hslocQuestionnaire;
    case "hb":
      return hbQuestionnaire;
    case "psc":
      return pscQuestionnaire;
    case "mkq":
      return mkqQuestionnaire;
    case "gpoc":
      return gpocQuestionnaire;
    default:
      return null;
  }
};

/**
 * Returns all available questionnaires
 */
export const getAllQuestionnaires = (): Questionnaire[] => {
  return [
    hit6Questionnaire,
    fhtQuestionnaire, 
    midasQuestionnaire,
    hsesQuestionnaire,
    psfsQuestionnaire,
    hslocQuestionnaire,
    hbQuestionnaire,
    pscQuestionnaire,
    mkqQuestionnaire,
    gpocQuestionnaire
  ];
};
