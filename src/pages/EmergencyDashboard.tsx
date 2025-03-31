
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AlertSidebar from '@/components/AlertSidebar';
import AlertDialog from '@/components/AlertDialog';
import { Alert } from '@/context/AlertContext';
import { Flame, Stethoscope, CloudLightning, Car } from 'lucide-react';

const EmergencyDashboard: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const { isAuthenticated, userRole } = useAuth();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  // Redirect if not authenticated or if role doesn't match route
  if (!isAuthenticated || userRole !== serviceType) {
    return <Navigate to="/" replace />;
  }

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setAlertDialogOpen(true);
  };

  const getServiceIcon = () => {
    switch (serviceType) {
      case 'fire':
        return <Flame className="h-6 w-6 text-fire" />;
      case 'medical':
        return <Stethoscope className="h-6 w-6 text-medical" />;
      case 'disaster':
        return <CloudLightning className="h-6 w-6 text-disaster" />;
      case 'accident':
        return <Car className="h-6 w-6 text-accident" />;
      default:
        return null;
    }
  };

  const getServiceTitle = () => {
    switch (serviceType) {
      case 'fire':
        return 'Fire Emergency Services';
      case 'medical':
        return 'Medical Emergency Services';
      case 'disaster':
        return 'Natural Disaster Response';
      case 'accident':
        return 'Road Accident Response';
      default:
        return 'Emergency Services';
    }
  };

  const getServiceColor = () => {
    switch (serviceType) {
      case 'fire':
        return 'text-fire';
      case 'medical':
        return 'text-medical';
      case 'disaster':
        return 'text-disaster';
      case 'accident':
        return 'text-accident';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AlertSidebar onAlertClick={handleAlertClick} />
        
        <div className="flex-1 overflow-auto">
          <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                {getServiceIcon()}
                <h1 className={`text-xl font-bold ${getServiceColor()}`}>
                  {getServiceTitle()}
                </h1>
              </div>
            </div>
          </header>
          
          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to the {getServiceTitle()} dashboard. From here, you can monitor and respond to emergency alerts.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Active Alerts</h3>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Pending Response</h3>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Responding Units</h3>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Resolved Today</h3>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Use these tools to quickly respond to emerging situations.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 border border-gray-200 rounded-md text-left hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium">Deploy Units</h3>
                      <p className="text-sm text-gray-500">Assign response teams</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-md text-left hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium">Contact Responders</h3>
                      <p className="text-sm text-gray-500">Direct communication</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-md text-left hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium">Issue Alert</h3>
                      <p className="text-sm text-gray-500">Public notifications</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-md text-left hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium">Generate Report</h3>
                      <p className="text-sm text-gray-500">Incident documentation</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Response Area Map</h2>
              <div className="bg-gray-100 h-96 rounded-md flex items-center justify-center border border-gray-200">
                <p className="text-gray-500">Map view would be displayed here</p>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <AlertDialog 
        alert={selectedAlert} 
        open={alertDialogOpen} 
        onOpenChange={setAlertDialogOpen} 
      />
    </SidebarProvider>
  );
};

export default EmergencyDashboard;
