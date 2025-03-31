
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, useAlerts } from '@/context/AlertContext';
import { format } from 'date-fns';

interface AlertBellProps {
  onAlertClick: (alert: Alert) => void;
}

const AlertBell: React.FC<AlertBellProps> = ({ onAlertClick }) => {
  const { alerts, newAlerts } = useAlerts();
  const [open, setOpen] = useState(false);

  // Sort alerts by timestamp (newest first)
  const sortedAlerts = [...alerts].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

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

  const handleAlertClick = (alert: Alert) => {
    onAlertClick(alert);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg hover:bg-gray-100 bg-white w-14 h-14"
        >
          <div className="relative">
            <Bell className={`h-6 w-6 ${newAlerts > 0 ? 'animate-bell-shake' : ''}`} />
            {newAlerts > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <Badge variant="destructive" className="relative inline-flex rounded-full h-5 w-5 justify-center items-center text-[10px] p-0">
                  {newAlerts}
                </Badge>
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {newAlerts > 0 && (
              <Badge variant="destructive" className="ml-2">
                {newAlerts} new
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-150px)]">
          {sortedAlerts.length > 0 ? (
            <div className="space-y-4 pr-4">
              {sortedAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors ${getAlertTypeClass(alert.type)} ${alert.status === 'new' ? 'bg-gray-50' : ''}`}
                  onClick={() => handleAlertClick(alert)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{alert.title}</h4>
                    {alert.status === 'new' && (
                      <Badge className="ml-2 bg-blue-500">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{alert.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {format(alert.timestamp, 'MMM d, h:mm a')}
                    </span>
                    <Badge className={`
                      ${alert.type === 'fire' ? 'bg-fire' : 
                        alert.type === 'medical' ? 'bg-medical' : 
                        alert.type === 'disaster' ? 'bg-disaster' : 
                        'bg-accident'} text-white text-xs
                    `}>
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No notifications</p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default AlertBell;
