
import React, { useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flame, Stethoscope, CloudLightning, Car, User } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  // Fade-in effect
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // Redirect authenticated users
  if (isAuthenticated) {
    if (userRole === 'public') {
      return <Navigate to="/public" replace />;
    } else {
      return <Navigate to={`/dashboard/${userRole}`} replace />;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute w-full h-full">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/20 rounded-full filter blur-3xl animate-pulse delay-3000"></div>
      </div>
      
      <div className="text-center mb-8 absolute top-8 z-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-2 animate-pulse">
          VillageSiren
        </h1>
        <p className="text-gray-300 text-lg animate-fade-in">Emergency Response System</p>
        <Button 
          variant="link" 
          onClick={() => navigate('/welcome')}
          className="mt-2 text-purple-400 hover:text-purple-300 animate-bounce"
        >
          Learn More
        </Button>
      </div>
      
      <LoginForm />
      
      {/* Enhanced decorative elements */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-sm font-medium">
        Protecting communities together • Fast • Reliable • Secure
      </div>

      {/* Emergency service icons */}
      <div className="absolute left-10 top-1/3 transform -translate-y-1/2 hidden lg:flex flex-col gap-6">
        <div className="p-3 rounded-full bg-gradient-to-r from-fire to-fire-dark shadow-lg shadow-fire/30 animate-pulse delay-100">
          <Flame className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-medical to-medical-dark shadow-lg shadow-medical/30 animate-pulse delay-300">
          <Stethoscope className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-disaster to-disaster-dark shadow-lg shadow-disaster/30 animate-pulse delay-500">
          <CloudLightning className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-accident to-accident-dark shadow-lg shadow-accident/30 animate-pulse delay-700">
          <Car className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="absolute right-10 top-1/3 transform -translate-y-1/2 hidden lg:flex flex-col gap-6">
        <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg shadow-purple/30 animate-pulse delay-200">
          <User className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg shadow-blue/30 animate-pulse delay-400">
          <User className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-700 shadow-lg shadow-pink/30 animate-pulse delay-600">
          <User className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 shadow-lg shadow-amber/30 animate-pulse delay-800">
          <User className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Index;
