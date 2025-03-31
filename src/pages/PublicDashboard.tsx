
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import EmergencyForm from '@/components/EmergencyForm';
import AlertBell from '@/components/AlertBell';
import AlertDialog from '@/components/AlertDialog';
import { Alert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, Stethoscope, CloudLightning, Car, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PublicDashboard = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const { toast } = useToast();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          <div className="flex items-center space-x-2">
            <img 
              src="https://via.placeholder.com/40" 
              alt="Logo" 
              className="w-10 h-10 rounded-full" 
            />
            <h1 className="text-xl font-bold">VillageSiren</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="report" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="report" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              <span className="hidden sm:inline">Report Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="fire" className="flex items-center gap-2 text-fire">
              <Flame className="h-4 w-4" />
              <span className="hidden sm:inline">Fire Services</span>
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2 text-medical">
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">Medical Services</span>
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2 text-disaster">
              <CloudLightning className="h-4 w-4" />
              <span className="hidden sm:inline">Safety Info</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="pt-4">
            <EmergencyForm />
          </TabsContent>
          
          <TabsContent value="fire">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-fire mb-4">Fire Emergency Services</h2>
              <p className="text-gray-600 mb-6">
                Fire emergencies require immediate action. Our fire services are available 24/7 to respond to any fire-related incidents.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium text-lg mb-2">Contact Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Emergency Hotline: <span className="font-medium">999</span></li>
                    <li>Non-Emergency: <span className="font-medium">0123-456-7890</span></li>
                    <li>Email: <span className="font-medium">fire@villagesiren.com</span></li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium text-lg mb-2">Fire Safety Tips</h3>
                  <ul className="space-y-2 text-gray-600">
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-medical mb-4">Medical Emergency Services</h2>
              <p className="text-gray-600 mb-6">
                Our medical emergency teams are trained to provide immediate medical assistance in all types of emergencies.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium text-lg mb-2">Contact Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Emergency Ambulance: <span className="font-medium">999</span></li>
                    <li>Medical Helpline: <span className="font-medium">0123-456-7891</span></li>
                    <li>Email: <span className="font-medium">medical@villagesiren.com</span></li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium text-lg mb-2">First Aid Information</h3>
                  <ul className="space-y-2 text-gray-600">
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-disaster mb-4">Safety Information</h2>
              <p className="text-gray-600 mb-6">
                Being prepared for disasters and accidents can save lives. Learn about safety procedures and precautions.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium text-lg mb-2">Natural Disaster Preparedness</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Create an emergency plan for your household</li>
                    <li>• Keep emergency supplies stocked</li>
                    <li>• Know your evacuation routes</li>
                    <li>• Stay informed through emergency alerts</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium text-lg mb-2">Road Safety</h3>
                  <ul className="space-y-2 text-gray-600">
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
