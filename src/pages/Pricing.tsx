import { Navigate } from "react-router-dom";

// Pricing page is hidden during beta - redirect to dashboard
const Pricing = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Pricing;
