
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import Register from "@/pages/Register";
import PhaseOne from "@/pages/PhaseOne";
import PhaseTwo from "@/pages/PhaseTwo";
import PhaseThree from "@/pages/PhaseThree";
import PhaseFour from "@/pages/PhaseFour";
import LearnMore from "@/pages/LearnMore";
import About from "@/pages/About";
import Story from "@/pages/Story";
import Pricing from "@/pages/Pricing";
import Support from "@/pages/Support";
import Policy from "@/pages/Policy";
import Questionnaire from "@/pages/Questionnaire";
import { CookieConsent } from "@/components/compliance/CookieConsent";
import { AgeVerification } from "@/components/compliance/AgeVerification";
import { MedicalDisclaimer } from "@/components/compliance/MedicalDisclaimer";
import DiagnosisGuard from "@/components/compliance/DiagnosisGuard";
import { DiagnosisAttestation } from "@/components/compliance/DiagnosisAttestation";
import NotDiagnosed from "@/pages/NotDiagnosed";
import WelcomeOnboarding from "@/components/onboarding/WelcomeOnboarding";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<DiagnosisGuard><Dashboard /></DiagnosisGuard>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<WelcomeOnboarding />} />
        <Route path="/phase-one" element={<DiagnosisGuard><PhaseOne /></DiagnosisGuard>} />
        <Route path="/phase-two" element={<DiagnosisGuard><PhaseTwo /></DiagnosisGuard>} />
        <Route path="/phase-three" element={<DiagnosisGuard><PhaseThree /></DiagnosisGuard>} />
        <Route path="/phase-four" element={<DiagnosisGuard><PhaseFour /></DiagnosisGuard>} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/about" element={<About />} />
        <Route path="/story" element={<Story />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/not-diagnosed" element={<NotDiagnosed />} />
        <Route path="/questionnaire" element={<DiagnosisGuard><Questionnaire /></DiagnosisGuard>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global compliance components */}
      <CookieConsent />
      <AgeVerification />
      <MedicalDisclaimer />
      <DiagnosisAttestation />
      <Toaster />
    </Router>
  );
}

export default App;
