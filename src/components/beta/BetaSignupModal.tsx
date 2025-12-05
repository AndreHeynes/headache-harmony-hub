import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BetaSignupForm } from "./BetaSignupForm";
import { FlaskConical, Gift } from "lucide-react";

interface BetaSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BetaSignupModal = ({ open, onOpenChange }: BetaSignupModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <FlaskConical className="h-6 w-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-xl">Join Our Beta Program</DialogTitle>
          <DialogDescription>
            Be among the first to experience our headache recovery program
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-start gap-2">
          <Gift className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-800 text-sm">Beta Tester Incentive</p>
            <p className="text-xs text-green-700">
              1 month free premium access to My Headache Experience Journal App
            </p>
          </div>
        </div>

        <BetaSignupForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};
