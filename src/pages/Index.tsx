
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated, userRole } = useAuth();

  // Redirect authenticated users
  if (isAuthenticated) {
    if (userRole === 'public') {
      return <Navigate to="/public" replace />;
    } else {
      return <Navigate to={`/dashboard/${userRole}`} replace />;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="text-center mb-8 absolute top-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">VillageSiren</h1>
        <p className="text-gray-600">Emergency Response System</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Index;
