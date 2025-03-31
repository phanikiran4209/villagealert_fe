
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AlertSidebar from '@/components/AlertSidebar';
import AlertDialog from '@/components/AlertDialog';
import { Alert, useAlerts } from '@/context/AlertContext';
import { Flame, Stethoscope, CloudLightning, Car, Bell } from 'lucide-react';

const EmergencyDashboard: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const { isAuthenticated, userRole } = useAuth();
  const { alerts, newAlerts } = useAlerts();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  // Redirect if not authenticated or if role doesn't match route
  if (!isAuthenticated || userRole !== serviceType) {
    return <Navigate to="/" replace />;
  }

  // Filter alerts based on service type
  const serviceAlerts = alerts.filter(alert => alert.type === serviceType);
  const serviceNewAlerts = serviceAlerts.filter(alert => alert.status === 'new').length;
  const serviceViewedAlerts = serviceAlerts.filter(alert => alert.status === 'viewed').length;
  const serviceRespondedAlerts = serviceAlerts.filter(alert => alert.status === 'responded').length;
  const serviceResolvedAlerts = serviceAlerts.filter(alert => alert.status === 'resolved').length;

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
        return {
          text: 'text-fire',
          bg: 'from-fire to-fire-dark',
          glow: 'shadow-fire/30'
        };
      case 'medical':
        return {
          text: 'text-medical',
          bg: 'from-medical to-medical-dark',
          glow: 'shadow-medical/30'
        };
      case 'disaster':
        return {
          text: 'text-disaster',
          bg: 'from-disaster to-disaster-dark',
          glow: 'shadow-disaster/30'
        };
      case 'accident':
        return {
          text: 'text-accident',
          bg: 'from-accident to-accident-dark',
          glow: 'shadow-accident/30'
        };
      default:
        return {
          text: 'text-gray-200',
          bg: 'from-gray-600 to-gray-700',
          glow: 'shadow-gray-500/30'
        };
    }
  };

  const serviceColor = getServiceColor();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-900 to-gray-800">
        <AlertSidebar onAlertClick={handleAlertClick} />
        
        <div className="flex-1 overflow-auto">
          <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 shadow-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <div className="flex items-center gap-2">
                {getServiceIcon()}
                <h1 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${serviceColor.bg}`}>
                  {getServiceTitle()}
                </h1>
              </div>
            </div>
            
            {serviceNewAlerts > 0 && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bell className={`h-6 w-6 ${serviceColor.text} animate-[bell-shake_1s_ease-in-out]`} />
                  <span className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-r ${serviceColor.bg} text-white text-xs flex items-center justify-center shadow-lg ${serviceColor.glow}`}>
                    {serviceNewAlerts}
                  </span>
                </div>
                <span className="text-white text-sm">New alerts</span>
              </div>
            )}
          </header>
          
          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
                <h2 className={`text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${serviceColor.bg}`}>Dashboard Overview</h2>
                <p className="text-gray-300 mb-4">
                  Welcome to the {getServiceTitle()} dashboard. From here, you can monitor and respond to emergency alerts.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:border-white/20 transition-all">
                    <h3 className={`font-medium text-sm ${serviceColor.text} mb-1`}>New Alerts</h3>
                    <p className={`text-2xl font-bold text-white ${serviceNewAlerts > 0 ? 'animate-pulse' : ''}`}>{serviceNewAlerts}</p>
                  </div>
                  <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:border-white/20 transition-all">
                    <h3 className={`font-medium text-sm ${serviceColor.text} mb-1`}>Viewed</h3>
                    <p className="text-2xl font-bold text-white">{serviceViewedAlerts}</p>
                  </div>
                  <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:border-white/20 transition-all">
                    <h3 className={`font-medium text-sm ${serviceColor.text} mb-1`}>Responding</h3>
                    <p className="text-2xl font-bold text-white">{serviceRespondedAlerts}</p>
                  </div>
                  <div className="bg-black/50 p-4 rounded-md border border-white/10 hover:border-white/20 transition-all">
                    <h3 className={`font-medium text-sm ${serviceColor.text} mb-1`}>Resolved</h3>
                    <p className="text-2xl font-bold text-white">{serviceResolvedAlerts}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
                <h2 className={`text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${serviceColor.bg}`}>Recent Alerts</h2>
                <div className="space-y-2">
                  {serviceAlerts.length > 0 ? (
                    serviceAlerts.slice(0, 5).map((alert) => (
                      <div 
                        key={alert.id} 
                        className={`
                          p-3 rounded-md cursor-pointer transition-all border
                          ${
                            alert.status === 'new' 
                              ? 'bg-black/60 border-white/20 shadow-md' 
                              : 'bg-black/40 border-white/10'
                          }
                          hover:border-${serviceType}/50 hover:bg-black/70
                        `}
                        onClick={() => handleAlertClick(alert)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className={`font-medium text-white ${alert.status === 'new' ? 'font-bold' : ''}`}>
                            {alert.title}
                          </h4>
                          <span 
                            className={`
                              text-xs px-2 py-1 rounded-full
                              ${
                                alert.status === 'new' ? 'bg-red-500/20 text-red-300' :
                                alert.status === 'viewed' ? 'bg-blue-500/20 text-blue-300' :
                                alert.status === 'responded' ? 'bg-amber-500/20 text-amber-300' :
                                'bg-green-500/20 text-green-300'
                              }
                            `}
                          >
                            {alert.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1 truncate">
                          {alert.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p>No alerts found</p>
                    </div>
                  )}
                  
                  {serviceAlerts.length > 5 && (
                    <button 
                      className={`w-full mt-2 py-2 text-sm rounded-md bg-gradient-to-r ${serviceColor.bg} text-white shadow-md ${serviceColor.glow} hover:shadow-lg transition-all`}
                      onClick={() => document.querySelector('.sidebar-content')?.scrollIntoView({behavior: 'smooth'})}
                    >
                      View All Alerts
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
              <h2 className={`text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${serviceColor.bg}`}>Response Area Map</h2>
              <div className="bg-black/50 h-96 rounded-md flex flex-col items-center justify-center border border-white/10">
                <p className="text-gray-400">Interactive map would be displayed here</p>
                <div className={`mt-4 w-32 h-32 rounded-full bg-gradient-to-r ${serviceColor.bg} opacity-20 blur-2xl`}></div>
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
