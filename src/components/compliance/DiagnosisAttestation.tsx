import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";

// Minimal, non-PHI attestation keys
const ATTESTED_KEY = "diagnosis-attested"; // "true" | undefined
const CATEGORY_KEY = "diagnosis-category"; // "primary" | "secondary:cervicogenic" | "secondary:tmj"
const DATE_KEY = "diagnosis-attestation-date"; // ISO string

const ATTTESTATION_TTL_DAYS = 180; // re-confirm every ~6 months

function isAttestationExpired(iso?: string | null) {
  if (!iso) return true;
  const then = new Date(iso);
  if (isNaN(then.getTime())) return true;
  const now = new Date();
  const diffDays = (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > ATTTESTATION_TTL_DAYS;
}

export type DiagnosisCategory =
  | "primary"
  | "secondary:cervicogenic"
  | "secondary:tmj";

export const DiagnosisAttestation: React.FC = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [confirmDoctorDiag, setConfirmDoctorDiag] = useState(false);
  const [confirmScope, setConfirmScope] = useState(false);
  const [category, setCategory] = useState<DiagnosisCategory | "">("");

  const attested = useMemo(() => localStorage.getItem(ATTESTED_KEY) === "true", []);
  const lastDate = useMemo(() => localStorage.getItem(DATE_KEY), []);

  useEffect(() => {
    const shouldOpen = !attested || isAttestationExpired(lastDate);
    if (shouldOpen) setOpen(true);
  }, [attested, lastDate]);

  const canProceed = confirmDoctorDiag && confirmScope && !!category;

  const handleProceed = () => {
    if (!canProceed) return;
    try {
      localStorage.setItem(ATTESTED_KEY, "true");
      localStorage.setItem(CATEGORY_KEY, String(category));
      localStorage.setItem(DATE_KEY, new Date().toISOString());
      setOpen(false);
    } catch (e) {
      console.error("Failed saving attestation", e);
    }
  };

  const handleOpenChange = (next: boolean) => {
    // Prevent closing until accepted
    if (!next && !(localStorage.getItem(ATTESTED_KEY) === "true")) {
      setOpen(true);
      return;
    }
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Diagnosis Confirmation</DialogTitle>
          <DialogDescription>
            Please confirm you have an eligible diagnosis. This helps ensure safe and
            appropriate use of the program.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <section className="space-y-2">
            <p className="text-sm text-muted-foreground">
              This program is suitable for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Primary Headache Disorders</li>
              <li>
                Secondary Headache Disorders limited to:
                <ul className="list-[circle] pl-5 mt-1 space-y-1">
                  <li>Cervicogenic Headaches</li>
                  <li>Temporomandibular-related (TMJ) Headaches</li>
                </ul>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              It is not appropriate for other causes of secondary headache. Using it inappropriately
              could delay necessary care. Proceed only if a licensed medical doctor has provided a
              qualifying diagnosis.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="confirmDoctor"
                checked={confirmDoctorDiag}
                onCheckedChange={(v) => setConfirmDoctorDiag(Boolean(v))}
              />
              <Label htmlFor="confirmDoctor" className="leading-snug">
                I confirm a licensed medical doctor has diagnosed me with a qualifying headache
                condition.
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="confirmScope"
                checked={confirmScope}
                onCheckedChange={(v) => setConfirmScope(Boolean(v))}
              />
              <Label htmlFor="confirmScope" className="leading-snug">
                I understand this program is not intended for other secondary headache causes and does
                not replace medical care.
              </Label>
            </div>

            <div className="space-y-3">
              <Label className="font-medium">Select your diagnosis category</Label>
              <RadioGroup value={category} onValueChange={(v) => setCategory(v as DiagnosisCategory)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="primary" id="cat-primary" />
                  <Label htmlFor="cat-primary">Primary Headache Disorder</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="secondary:cervicogenic" id="cat-cgh" />
                  <Label htmlFor="cat-cgh">Secondary – Cervicogenic Headache</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="secondary:tmj" id="cat-tmj" />
                  <Label htmlFor="cat-tmj">Secondary – Temporomandibular-related Headache</Label>
                </div>
              </RadioGroup>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button onClick={handleProceed} disabled={!canProceed}>
              Proceed
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/not-diagnosed")}
            >
              I’m not diagnosed / different diagnosis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
