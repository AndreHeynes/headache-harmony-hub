import { useUserStatusContext } from "@/contexts/UserStatusContext";

export interface UserStatus {
  hasSubscription: boolean;
  hasCompletedOnboarding: boolean;
  currentPhase: number;
  phaseOneDay: number;
  phaseTwoWeek: number;
  phaseThreeDay: number;
  isBetaTester: boolean;
  loading: boolean;
  isInitialized: boolean;
  refetch: () => Promise<void>;
  updateLocalStatus: (updates: Partial<UserStatus>) => void;
}

export const useUserStatus = (): UserStatus => {
  return useUserStatusContext();
};
