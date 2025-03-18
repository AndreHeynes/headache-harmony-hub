
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PhaseOne from "./pages/PhaseOne";
import PhaseTwo from "./pages/PhaseTwo";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import LearnMore from "./pages/LearnMore";
import Support from "./pages/Support";
import Pricing from "./pages/Pricing";
import Policy from "./pages/Policy";
import Questionnaire from "./pages/Questionnaire";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/phase-one" element={<PhaseOne />} />
        <Route path="/phase-two" element={<PhaseTwo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/support" element={<Support />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/questionnaire/:id" element={<Questionnaire />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
