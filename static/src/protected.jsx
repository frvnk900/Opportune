// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./security"

const ProtectedRoute = ({ children, allowedRole }) => {
  const { role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!role || role !== allowedRole) return <Navigate to="/welcome" replace />;

  return children;
};

export default ProtectedRoute;
