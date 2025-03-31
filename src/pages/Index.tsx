
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute w-full h-full">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="text-center mb-8 absolute top-8 z-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-2 animate-pulse">
          VillageSiren
        </h1>
        <p className="text-gray-300 text-lg">Emergency Response System</p>
      </div>
      
      <LoginForm />
      
      {/* Additional decorative elements */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
        Protecting communities together
      </div>
    </div>
  );
};

export default Index;
