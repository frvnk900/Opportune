 // src/AppRoutes.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import OrganisationMatches from "./Components/routes/chat-Routes/OrgMatches";

// Pages
import Welcome from "./Components/Landing";
import TermsAndConditions from "./Components/routes/TandC";
import MatchOrganisationForm from "./Components/routes/chat-Routes/OrgRequestChat";
import ClientLogin from "./Components/routes/Auth-Routes/Cli_signIN";
import ClientSignup from "./Components/routes/Auth-Routes/Cli_register";
import SignIn from "./Components/routes/Auth-Routes/Org_signIN";
import SignUp from "./Components/routes/Auth-Routes/Org_SignUP";
import ClientRecommendation from "./Components/routes/chat-Routes/ClientHome";

const ProtectedRoute = ({ children, allowedRole }) => {
  const clientToken = localStorage.getItem("client_token");
  const orgToken = localStorage.getItem("token");

  const currentRole = clientToken ? "client" : orgToken ? "organisation" : null;

  if (!currentRole || currentRole !== allowedRole) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const clientToken = localStorage.getItem("client_token");
    const orgToken = localStorage.getItem("token");

    if (clientToken) {
      setUserRole("client");
    } else if (orgToken) {
      setUserRole("organisation");
    } else {
      setUserRole(null);
    }

    setAuthChecked(true);
  }, [location.pathname]);  

  if (!authChecked) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/terms_and_conditions" element={<TermsAndConditions />} />
      <Route path="/client/signin" element={<ClientLogin />} />
      <Route path="/client/signup" element={<ClientSignup />} />
      <Route path="/organisation/signin" element={<SignIn />} />
      <Route path="/organisation/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/clients/home"
        element={
          <ProtectedRoute allowedRole="client">
            <ClientRecommendation />
          </ProtectedRoute>
        }
      />
          <Route
        path="/organisation/home"
        element={
          <ProtectedRoute allowedRole="organisation">
            <OrganisationMatches />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organisation/matching_center"
        element={
          <ProtectedRoute allowedRole="organisation">
            <MatchOrganisationForm />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
};

export default AppRoutes;
