import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { BetaSessionProvider } from "@/contexts/BetaSessionContext";
import { BetaAccessGate } from "@/components/BetaAccessGate";
import { SharedHeader } from "@/components/SharedHeader";
import { BetaFeedbackForm } from "@/components/BetaFeedbackForm";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import PhaseOne from "@/pages/PhaseOne";
import PhaseOneVideoPlayer from "@/components/phase-one/PhaseOneVideoPlayer";
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
import Admin from "@/pages/Admin";
import { BetaAdminGuard } from "@/components/compliance/BetaAdminGuard";

// Pages that have their own header
const PAGES_WITH_OWN_HEADER = ['/'];

function AppContent() {
  const location = useLocation();
  const showSharedHeader = !PAGES_WITH_OWN_HEADER.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      {showSharedHeader && <SharedHeader title="Recovery Program" />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/story" element={<Story />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/not-diagnosed" element={<NotDiagnosed />} />
        
        {/* Beta protected routes - BetaAccessGate handles all access control */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onboarding" element={<WelcomeOnboarding />} />
        
        <Route 
          path="/questionnaire" 
          element={
            <DiagnosisGuard>
              <Questionnaire />
            </DiagnosisGuard>
          } 
        />
        
        {/* Phase routes with diagnosis guard */}
        <Route 
          path="/phase-one" 
          element={
            <DiagnosisGuard>
              <PhaseOne />
            </DiagnosisGuard>
          } 
        />
        <Route 
          path="/phase-one/video" 
          element={
            <DiagnosisGuard>
              <PhaseOneVideoPlayer />
            </DiagnosisGuard>
          } 
        />
        <Route 
          path="/phase-two" 
          element={
            <DiagnosisGuard>
              <PhaseTwo />
            </DiagnosisGuard>
          } 
        />
        <Route 
          path="/phase-three" 
          element={
            <DiagnosisGuard>
              <PhaseThree />
            </DiagnosisGuard>
          } 
        />
        <Route 
          path="/phase-four" 
          element={
            <DiagnosisGuard>
              <PhaseFour />
            </DiagnosisGuard>
          } 
        />
        
        {/* Admin route - uses beta admin guard */}
        <Route 
          path="/admin" 
          element={
            <BetaAdminGuard>
              <Admin />
            </BetaAdminGuard>
          } 
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global compliance components */}
      <CookieConsent />
      <AgeVerification />
      <MedicalDisclaimer />
      <DiagnosisAttestation />
      <Toaster />
      
      {/* Beta feedback form for authenticated users */}
      <BetaFeedbackForm />
    </div>
  );
}

function App() {
  return (
    <BetaSessionProvider>
      <BetaAccessGate signupUrl="https://headache-recovery.lovable.app">
        <Router>
          <AppContent />
        </Router>
      </BetaAccessGate>
    </BetaSessionProvider>
  );
}

export default App;
