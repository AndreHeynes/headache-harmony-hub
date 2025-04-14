
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phase-one" element={<PhaseOne />} />
        <Route path="/phase-two" element={<PhaseTwo />} />
        <Route path="/phase-three" element={<PhaseThree />} />
        <Route path="/phase-four" element={<PhaseFour />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/about" element={<About />} />
        <Route path="/story" element={<Story />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global compliance components */}
      <CookieConsent />
      <AgeVerification />
      <MedicalDisclaimer />
      <Toaster />
    </Router>
  );
}

export default App;
