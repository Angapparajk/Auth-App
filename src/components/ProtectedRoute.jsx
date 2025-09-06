import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// Usage: <ProtectedRoute><Dashboard /></ProtectedRoute>
const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://auth-5lhr.onrender.com/api/auth/dashboard', { withCredentials: true })
      .then(res => setAuth(true))
      .catch(() => setAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!auth) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
