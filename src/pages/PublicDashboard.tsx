
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import EmergencyForm from '@/components/EmergencyForm';
import AlertBell from '@/components/AlertBell';
import AlertDialog from '@/components/AlertDialog';
import { Alert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, Stethoscope, CloudLightning, Car, LogOut, Shield, Bell, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PublicDashboard = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const { toast } = useToast();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [showEmergencyOptions, setShowEmergencyOptions] = useState(false);

  // If not authenticated or not the public role, redirect to home
  if (!isAuthenticated || userRole !== 'public') {
    return <Navigate to="/" replace />;
  }

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setAlertDialogOpen(true);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const emergencyOptions = [
    { 
      id: 'report',
      label: 'Report Emergency',
      icon: <Flame className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/40',
      onClick: () => {} 
    },
    { 
      id: 'call',
      label: 'Call Emergency (112)',
      icon: <Phone className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/40',
      onClick: () => {
        window.location.href = 'tel:112';
        setShowEmergencyOptions(false);
      } 
    },
    { 
      id: 'community',
      label: 'Community Alert',
      icon: <Bell className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/40',
      onClick: () => {
        toast({
          title: "Community Alert",
          description: "Feature coming soon!",
        });
        setShowEmergencyOptions(false);
      } 
    },
    { 
      id: 'safety',
      label: 'Safety Tips',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg shadow-purple-500/40',
      onClick: () => {
        setShowEmergencyOptions(false);
      } 
    },
    { 
      id: 'cancel',
      label: 'Cancel',
      icon: null,
      color: 'bg-gray-600 hover:bg-gray-700',
      onClick: () => setShowEmergencyOptions(false) 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              VillageSiren
            </h1>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 hover:bg-white/10">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="report" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-800/50 backdrop-blur-lg p-1 rounded-xl">
            <TabsTrigger 
              value="report" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/30"
            >
              <Flame className="h-4 w-4" />
              <span className="hidden sm:inline">Report Emergency</span>
            </TabsTrigger>
            <TabsTrigger 
              value="fire" 
              className="flex items-center gap-2 text-fire data-[state=active]:bg-gradient-to-r data-[state=active]:from-fire data-[state=active]:to-fire-dark data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-fire/30"
            >
              <Flame className="h-4 w-4" />
              <span className="hidden sm:inline">Fire Services</span>
            </TabsTrigger>
            <TabsTrigger 
              value="medical" 
              className="flex items-center gap-2 text-medical data-[state=active]:bg-gradient-to-r data-[state=active]:from-medical data-[state=active]:to-medical-dark data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-medical/30"
            >
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">Medical Services</span>
            </TabsTrigger>
            <TabsTrigger 
              value="safety" 
              className="flex items-center gap-2 text-disaster data-[state=active]:bg-gradient-to-r data-[state=active]:from-disaster data-[state=active]:to-disaster-dark data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-disaster/30"
            >
              <CloudLightning className="h-4 w-4" />
              <span className="hidden sm:inline">Safety Info</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="pt-4">
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">Report an Emergency</h2>
              <EmergencyForm />
            </div>
          </TabsContent>
          
          <TabsContent value="fire">
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fire to-fire-light mb-4">Fire Emergency Services</h2>
              <p className="text-gray-300 mb-6">
                Fire emergencies require immediate action. Our fire services are available 24/7 to respond to any fire-related incidents.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:shadow-lg hover:shadow-fire/20 transition-all">
                  <h3 className="font-medium text-lg mb-2 text-fire-light">Contact Information</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Emergency Hotline: <span className="font-medium text-white">999</span></li>
                    <li>Non-Emergency: <span className="font-medium text-white">0123-456-7890</span></li>
                    <li>Email: <span className="font-medium text-white">fire@villagesiren.com</span></li>
                  </ul>
                </div>
                <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:shadow-lg hover:shadow-fire/20 transition-all">
                  <h3 className="font-medium text-lg mb-2 text-fire-light">Fire Safety Tips</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Install smoke alarms on every level of your home</li>
                    <li>• Have a fire escape plan and practice it regularly</li>
                    <li>• Keep flammable items away from heat sources</li>
                    <li>• Never leave cooking unattended</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="medical">
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-medical to-medical-light mb-4">Medical Emergency Services</h2>
              <p className="text-gray-300 mb-6">
                Our medical emergency teams are trained to provide immediate medical assistance in all types of emergencies.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:shadow-lg hover:shadow-medical/20 transition-all">
                  <h3 className="font-medium text-lg mb-2 text-medical-light">Contact Information</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Emergency Ambulance: <span className="font-medium text-white">999</span></li>
                    <li>Medical Helpline: <span className="font-medium text-white">0123-456-7891</span></li>
                    <li>Email: <span className="font-medium text-white">medical@villagesiren.com</span></li>
                  </ul>
                </div>
                <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:shadow-lg hover:shadow-medical/20 transition-all">
                  <h3 className="font-medium text-lg mb-2 text-medical-light">First Aid Information</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• For heart attack: Call 999 immediately</li>
                    <li>• For choking: Perform the Heimlich maneuver</li>
                    <li>• For bleeding: Apply direct pressure</li>
                    <li>• For burns: Cool with running water</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="safety">
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-disaster to-disaster-light mb-4">Safety Information</h2>
              <p className="text-gray-300 mb-6">
                Being prepared for disasters and accidents can save lives. Learn about safety procedures and precautions.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:shadow-lg hover:shadow-disaster/20 transition-all">
                  <h3 className="font-medium text-lg mb-2 text-disaster-light">Natural Disaster Preparedness</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Create an emergency plan for your household</li>
                    <li>• Keep emergency supplies stocked</li>
                    <li>• Know your evacuation routes</li>
                    <li>• Stay informed through emergency alerts</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:shadow-lg hover:shadow-disaster/20 transition-all">
                  <h3 className="font-medium text-lg mb-2 text-disaster-light">Road Safety</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Always wear seat belts</li>
                    <li>• Never drive under the influence</li>
                    <li>• Observe speed limits</li>
                    <li>• Avoid distractions while driving</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Custom Alert Bell */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setShowEmergencyOptions(!showEmergencyOptions)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 hover:scale-105 transition-transform relative"
          aria-label="Emergency Options"
        >
          <span className="absolute w-full h-full rounded-full bg-red-500 animate-ping opacity-75"></span>
          <Bell className="w-8 h-8 text-white animate-[bell-shake_1s_ease-in-out_infinite]" />
        </button>
      </div>

      {/* Emergency Options Panel */}
      {showEmergencyOptions && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowEmergencyOptions(false)}>
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-lg p-4 border border-white/10 shadow-2xl max-w-xs w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold mb-4 text-center uppercase text-sm tracking-wider">EMERGENCY OPTIONS</h3>
            <div className="space-y-3">
              {emergencyOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={option.onClick}
                  className={`flex items-center gap-3 w-full p-3 rounded-md text-white ${option.color} transition-all hover:scale-[1.02]`}
                >
                  {option.icon}
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <AlertBell onAlertClick={handleAlertClick} />
      <AlertDialog 
        alert={selectedAlert} 
        open={alertDialogOpen} 
        onOpenChange={setAlertDialogOpen} 
      />
    </div>
  );
};

export default PublicDashboard;
