import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flame, Stethoscope, CloudLightning, Car, ArrowRight, Shield, Bell, Clock, Users, MapPin } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-full h-full">
        <div className="absolute top-0 left-10 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-green-500/20 rounded-full filter blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-pulse">
              Welcome to VillageSiren
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light text-gray-300 mb-10">
            Empowering communities with a unified emergency response system that saves lives and ensures timely assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <Button 
              onClick={() => navigate('/login')} // Changed from '/' to '/login'
              className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 py-6 px-8 rounded-xl animate-bounce"
              size="lg"
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Rest of the LandingPage remains the same */}
      {/* Service Cards */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Emergency Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Fire Emergency */}
          <div className={`group transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl border border-white/5 hover:border-fire/30 shadow-xl hover:shadow-fire/20 transition-all duration-300 h-full flex flex-col group-hover:scale-105">
              <div className="p-3 bg-gradient-to-r from-fire to-fire-dark rounded-full w-fit mb-4 shadow-lg shadow-fire/30">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-fire-light transition-colors">Fire Emergency</h3>
              <p className="text-gray-300 mb-4 flex-grow">Rapid response to fires with trained firefighters and equipment to protect lives and property.</p>
              <div className="mt-auto">
                <Button 
                  variant="outline" 
                  className="w-full border-fire/20 hover:bg-fire/10 hover:text-fire-light hover:border-fire/30 transition-all"
                  onClick={() => navigate('/login')}
                >
                  Login as Fire Responder
                </Button>
              </div>
            </div>
          </div>

          {/* Medical Emergency */}
          <div className={`group transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl border border-white/5 hover:border-medical/30 shadow-xl hover:shadow-medical/20 transition-all duration-300 h-full flex flex-col group-hover:scale-105">
              <div className="p-3 bg-gradient-to-r from-medical to-medical-dark rounded-full w-fit mb-4 shadow-lg shadow-medical/30">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-medical-light transition-colors">Medical Emergency</h3>
              <p className="text-gray-300 mb-4 flex-grow">Emergency medical services with trained professionals for immediate medical assistance.</p>
              <div className="mt-auto">
                <Button 
                  variant="outline" 
                  className="w-full border-medical/20 hover:bg-medical/10 hover:text-medical-light hover:border-medical/30 transition-all"
                  onClick={() => navigate('/')}
                >
                  Login as Medical Responder
                </Button>
              </div>
            </div>
          </div>

          {/* Natural Disaster */}
          <div className={`group transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl border border-white/5 hover:border-disaster/30 shadow-xl hover:shadow-disaster/20 transition-all duration-300 h-full flex flex-col group-hover:scale-105">
              <div className="p-3 bg-gradient-to-r from-disaster to-disaster-dark rounded-full w-fit mb-4 shadow-lg shadow-disaster/30">
                <CloudLightning className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-disaster-light transition-colors">Natural Disaster</h3>
              <p className="text-gray-300 mb-4 flex-grow">Coordinated response to natural disasters like floods, earthquakes, and storms to minimize impact.</p>
              <div className="mt-auto">
                <Button 
                  variant="outline" 
                  className="w-full border-disaster/20 hover:bg-disaster/10 hover:text-disaster-light hover:border-disaster/30 transition-all"
                  onClick={() => navigate('/')}
                >
                  Login as Disaster Responder
                </Button>
              </div>
            </div>
          </div>

          {/* Road Accident */}
          <div className={`group transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl border border-white/5 hover:border-accident/30 shadow-xl hover:shadow-accident/20 transition-all duration-300 h-full flex flex-col group-hover:scale-105">
              <div className="p-3 bg-gradient-to-r from-accident to-accident-dark rounded-full w-fit mb-4 shadow-lg shadow-accident/30">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accident-light transition-colors">Road Accident</h3>
              <p className="text-gray-300 mb-4 flex-grow">Swift response to traffic accidents with specialized equipment and trained personnel.</p>
              <div className="mt-auto">
                <Button 
                  variant="outline" 
                  className="w-full border-accident/20 hover:bg-accident/10 hover:text-accident-light hover:border-accident/30 transition-all"
                  onClick={() => navigate('/')}
                >
                  Login as Accident Responder
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className={`transition-all duration-1000 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg shadow-purple-500/30 mb-4">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Alerts</h3>
              <p className="text-gray-300">Instant notifications for emergencies with critical information.</p>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg shadow-blue-500/30 mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Location Tracking</h3>
              <p className="text-gray-300">Precise GPS coordinates to locate emergencies quickly.</p>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-350 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-gradient-to-r from-pink-600 to-pink-800 shadow-lg shadow-pink-500/30 mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Response Tracking</h3>
              <p className="text-gray-300">Monitor status updates from initial alert to resolution.</p>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-450 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 shadow-lg shadow-amber-500/30 mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Safety</h3>
              <p className="text-gray-300">Unified platform for residents and emergency services.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={`relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg p-8 sm:p-12 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Ready to Join the VillageSiren Community?
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Whether you're a community member or emergency service provider, VillageSiren helps connect those in need with those who can help.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate('/')} 
              className="text-lg bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg shadow-orange-500/30 py-6 px-8 rounded-xl"
              size="lg"
            >
              Get Started Today <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-8 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                VillageSiren
              </h2>
              <p className="text-gray-400">Emergency Response System</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} VillageSiren. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
