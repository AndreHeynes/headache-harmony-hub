import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { UserStatusProvider } from "@/contexts/UserStatusContext";
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
import BetaSignup from "@/pages/BetaSignup";
import { CookieConsent } from "@/components/compliance/CookieConsent";
import { AgeVerification } from "@/components/compliance/AgeVerification";
import { MedicalDisclaimer } from "@/components/compliance/MedicalDisclaimer";
import DiagnosisGuard from "@/components/compliance/DiagnosisGuard";
import { DiagnosisAttestation } from "@/components/compliance/DiagnosisAttestation";
import NotDiagnosed from "@/pages/NotDiagnosed";
import WelcomeOnboarding from "@/components/onboarding/WelcomeOnboarding";
import Admin from "@/pages/Admin";
import { AdminGuard } from "@/components/compliance/AdminGuard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <UserStatusProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/beta-signup" element={<BetaSignup />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/story" element={<Story />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/not-diagnosed" element={<NotDiagnosed />} />
          
          {/* Protected - requires auth + subscription + onboarding */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requireSubscription requireOnboarding>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected - requires auth only */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected - requires auth + subscription */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute requireSubscription>
                <WelcomeOnboarding />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected - requires auth */}
          <Route 
            path="/questionnaire" 
            element={
              <ProtectedRoute>
                <DiagnosisGuard>
                  <Questionnaire />
                </DiagnosisGuard>
              </ProtectedRoute>
            } 
          />
          
          {/* Phase routes - requires auth + subscription + onboarding */}
          <Route 
            path="/phase-one" 
            element={
              <ProtectedRoute requireSubscription requireOnboarding>
                <DiagnosisGuard>
                  <PhaseOne />
                </DiagnosisGuard>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/phase-two" 
            element={
              <ProtectedRoute requireSubscription requireOnboarding>
                <DiagnosisGuard>
                  <PhaseTwo />
                </DiagnosisGuard>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/phase-three" 
            element={
              <ProtectedRoute requireSubscription requireOnboarding>
                <DiagnosisGuard>
                  <PhaseThree />
                </DiagnosisGuard>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/phase-four" 
            element={
              <ProtectedRoute requireSubscription requireOnboarding>
                <DiagnosisGuard>
                  <PhaseFour />
                </DiagnosisGuard>
              </ProtectedRoute>
            } 
          />
          
          {/* Admin route - requires auth */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminGuard>
                  <Admin />
                </AdminGuard>
              </ProtectedRoute>
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
      </UserStatusProvider>
    </Router>
  );
}

export default App;
