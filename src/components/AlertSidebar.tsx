import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader 
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Flame, Stethoscope, CloudLightning, Car, Bell, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAlerts, Alert } from '@/context/AlertContext';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';

const getAlertTypeIcon = (type: Alert['type']) => {
  switch (type) {
    case 'fire':
      return <Flame className="text-orange-500 glow-orange" />;
    case 'medical':
      return <Stethoscope className="text-blue-500 glow-blue" />;
    case 'disaster':
      return <CloudLightning className="text-purple-500 glow-purple" />;
    case 'accident':
      return <Car className="text-red-500 glow-red" />;
    default:
      return <Bell className="text-gray-500" />;
  }
};

const getAlertTypeClass = (type: Alert['type']) => {
  switch (type) {
    case 'fire':
      return 'border-l-4 border-orange-500 bg-orange-50/50';
    case 'medical':
      return 'border-l-4 border-blue-500 bg-blue-50/50';
    case 'disaster':
      return 'border-l-4 border-purple-500 bg-purple-50/50';
    case 'accident':
      return 'border-l-4 border-red-500 bg-red-50/50';
    default:
      return 'border-l-4 border-gray-400 bg-gray-50/50';
  }
};

interface AlertSidebarProps {
  onAlertClick: (alert: Alert) => void;
}

const AlertSidebar: React.FC<AlertSidebarProps> = ({ onAlertClick }) => {
  const { userRole, logout } = useAuth();
  const { alerts, newAlerts } = useAlerts();
  const navigate = useNavigate();

  const filteredAlerts = userRole === 'public' 
    ? alerts 
    : alerts.filter(alert => alert.type === userRole);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-lg">
      <SidebarHeader className="p-4 flex justify-between items-center bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-indigo-600 glow-indigo animate-pulse" />
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            VillageSiren
          </span>
        </div>
        {newAlerts > 0 && (
          <Badge className="ml-2 bg-red-500 glow-red animate-pulse">
            {newAlerts} new
          </Badge>
        )}
      </SidebarHeader>
      
      <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <SidebarContent>
        <div className="p-4">
          <h3 className="font-semibold text-xl text-gray-800 mb-4">
            {userRole === 'public' 
              ? 'Your Reported Alerts' 
              : `${userRole?.charAt(0).toUpperCase()}${userRole?.slice(1)} Alerts`}
          </h3>
          
          <ScrollArea className="h-[calc(100vh-200px)]">
            {filteredAlerts.length > 0 ? (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${getAlertTypeClass(alert.type)} ${alert.status === 'new' ? 'animate-pulse bg-opacity-75' : ''}`}
                    onClick={() => onAlertClick(alert)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getAlertTypeIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-800 truncate">{alert.title}</h4>
                          {alert.status === 'new' && (
                            <Badge className="ml-2 bg-indigo-500 glow-indigo">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{alert.description}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-500 font-medium">
                            {format(alert.timestamp, 'MMM d, h:mm a')}
                          </span>
                          <span className="text-xs capitalize px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
                            {alert.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-white/50 rounded-lg shadow-inner">
                <Bell className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">No alerts found</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-4 bg-white/80 backdrop-blur-sm">
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-600 transition-all duration-300 glow-indigo"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AlertSidebar;