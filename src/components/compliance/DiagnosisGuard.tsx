import React, { PropsWithChildren, useMemo } from "react";
import { DiagnosisAttestation } from "@/components/compliance/DiagnosisAttestation";

// TODO [POST-BETA]: Migrate attestation storage from localStorage to database
// so it persists across devices and sessions. Currently acceptable for beta.
const ATTESTED_KEY = "diagnosis-attested";
const DATE_KEY = "diagnosis-attestation-date";
const ATTTESTATION_TTL_DAYS = 180;

function isExpired(iso?: string | null) {
  if (!iso) return true;
  const then = new Date(iso);
  if (isNaN(then.getTime())) return true;
  const now = new Date();
  const diffDays = (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > ATTTESTATION_TTL_DAYS;
}

export default function DiagnosisGuard({ children }: PropsWithChildren) {
  const attested = useMemo(() => localStorage.getItem(ATTESTED_KEY) === "true", []);
  const date = useMemo(() => localStorage.getItem(DATE_KEY), []);
  const needsAttestation = !attested || isExpired(date);

  return (
    <>
      {children}
      {needsAttestation && <DiagnosisAttestation />}
    </>
  );
}
