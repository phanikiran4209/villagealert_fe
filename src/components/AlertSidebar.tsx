
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
      return <Flame className="text-fire" />;
    case 'medical':
      return <Stethoscope className="text-medical" />;
    case 'disaster':
      return <CloudLightning className="text-disaster" />;
    case 'accident':
      return <Car className="text-accident" />;
    default:
      return <Bell />;
  }
};

const getAlertTypeClass = (type: Alert['type']) => {
  switch (type) {
    case 'fire':
      return 'border-l-4 border-fire';
    case 'medical':
      return 'border-l-4 border-medical';
    case 'disaster':
      return 'border-l-4 border-disaster';
    case 'accident':
      return 'border-l-4 border-accident';
    default:
      return 'border-l-4 border-gray-400';
  }
};

interface AlertSidebarProps {
  onAlertClick: (alert: Alert) => void;
}

const AlertSidebar: React.FC<AlertSidebarProps> = ({ onAlertClick }) => {
  const { userRole, logout } = useAuth();
  const { alerts, newAlerts } = useAlerts();
  const navigate = useNavigate();

  // Filter alerts based on user role
  const filteredAlerts = userRole === 'public' 
    ? alerts 
    : alerts.filter(alert => alert.type === userRole);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          <span className="font-bold text-lg">VillageSiren</span>
        </div>
        {newAlerts > 0 && (
          <Badge variant="destructive" className="ml-2">
            {newAlerts} new
          </Badge>
        )}
      </SidebarHeader>
      
      <Separator />
      
      <SidebarContent>
        <div className="p-4">
          <h3 className="font-medium text-lg">
            {userRole === 'public' 
              ? 'Your Reported Alerts' 
              : `${userRole?.charAt(0).toUpperCase()}${userRole?.slice(1)} Alerts`}
          </h3>
          
          <ScrollArea className="h-[calc(100vh-200px)] mt-4">
            {filteredAlerts.length > 0 ? (
              <div className="space-y-3">
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-3 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors ${getAlertTypeClass(alert.type)} ${alert.status === 'new' ? 'bg-gray-50' : ''}`}
                    onClick={() => onAlertClick(alert)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getAlertTypeIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium truncate">{alert.title}</h4>
                          {alert.status === 'new' && (
                            <Badge className="ml-2 bg-blue-500">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{alert.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-400">
                            {format(alert.timestamp, 'MMM d, h:mm a')}
                          </span>
                          <span className="text-xs capitalize px-2 py-1 rounded-full bg-gray-100">
                            {alert.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No alerts found</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AlertSidebar;
