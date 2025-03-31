
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, useAlerts } from '@/context/AlertContext';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Clock, User } from 'lucide-react';

interface AlertDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ alert, open, onOpenChange }) => {
  const { updateAlertStatus } = useAlerts();

  if (!alert) return null;

  const handleStatusChange = (status: Alert['status']) => {
    updateAlertStatus(alert.id, status);
    onOpenChange(false);
  };

  const getColorByType = (type: Alert['type']) => {
    switch (type) {
      case 'fire':
        return 'bg-fire text-white';
      case 'medical':
        return 'bg-medical text-white';
      case 'disaster':
        return 'bg-disaster text-white';
      case 'accident':
        return 'bg-accident text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{alert.title}</span>
            <Badge className={getColorByType(alert.type)}>
              {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>
              Reported {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {alert.imageUrl && (
            <div className="aspect-video overflow-hidden rounded-md">
              <img
                src={alert.imageUrl}
                alt="Emergency situation"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <h4 className="font-medium">Description</h4>
            <p className="text-gray-700">{alert.description}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Location
            </h4>
            <p className="text-gray-700">{alert.location.address}</p>
            <p className="text-sm text-gray-500">
              Coordinates: {alert.location.latitude.toFixed(6)}, {alert.location.longitude.toFixed(6)}
            </p>
          </div>
          
          {alert.reportedBy && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-1">
                <User className="h-4 w-4" />
                Reported By
              </h4>
              <p className="text-gray-700">{alert.reportedBy}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            <Badge className={`
              ${alert.status === 'new' ? 'bg-blue-500' : 
                alert.status === 'viewed' ? 'bg-yellow-500' : 
                alert.status === 'responded' ? 'bg-orange-500' : 
                'bg-green-500'} text-white
            `}>
              {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
            </Badge>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-end gap-2">
          {alert.status !== 'resolved' && (
            <>
              {alert.status === 'new' && (
                <Button variant="outline" onClick={() => handleStatusChange('viewed')}>
                  Mark as Viewed
                </Button>
              )}
              {(alert.status === 'new' || alert.status === 'viewed') && (
                <Button 
                  className={getColorByType(alert.type)}
                  onClick={() => handleStatusChange('responded')}
                >
                  Respond
                </Button>
              )}
              {alert.status === 'responded' && (
                <Button 
                  variant="outline"
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={() => handleStatusChange('resolved')}
                >
                  Mark Resolved
                </Button>
              )}
            </>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
