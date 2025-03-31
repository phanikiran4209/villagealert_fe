
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, useAlerts } from '@/context/AlertContext';
import { Flame, Stethoscope, CloudLightning, Car, MapPin, Clock, User, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AlertDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ alert, open, onOpenChange }) => {
  const { updateAlertStatus } = useAlerts();

  if (!alert) {
    return null;
  }

  const handleStatusUpdate = (status: Alert['status']) => {
    updateAlertStatus(alert.id, status);
    onOpenChange(false);
  };

  const getAlertTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'fire':
        return <Flame className="h-6 w-6 text-fire" />;
      case 'medical':
        return <Stethoscope className="h-6 w-6 text-medical" />;
      case 'disaster':
        return <CloudLightning className="h-6 w-6 text-disaster" />;
      case 'accident':
        return <Car className="h-6 w-6 text-accident" />;
    }
  };

  const getStatusClass = (status: Alert['status']) => {
    switch (status) {
      case 'new':
        return 'bg-red-500/20 text-red-300';
      case 'viewed':
        return 'bg-blue-500/20 text-blue-300';
      case 'responded':
        return 'bg-amber-500/20 text-amber-300';
      case 'resolved':
        return 'bg-green-500/20 text-green-300';
    }
  };

  const getTypeGradient = (type: Alert['type']) => {
    switch (type) {
      case 'fire':
        return 'from-fire to-fire-dark';
      case 'medical':
        return 'from-medical to-medical-dark';
      case 'disaster':
        return 'from-disaster to-disaster-dark';
      case 'accident':
        return 'from-accident to-accident-dark';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-white/10 bg-gray-900/90 backdrop-blur-xl text-white shadow-xl max-w-md md:max-w-lg w-[95vw] mx-auto max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full bg-gradient-to-r ${getTypeGradient(alert.type)} shadow-lg`}>
              {getAlertTypeIcon(alert.type)}
            </div>
            <DialogTitle className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              {alert.title}
            </DialogTitle>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span 
              className={`
                text-xs px-2 py-1 rounded-full font-semibold shadow-sm
                ${
                  alert.type === 'fire' ? 'bg-fire/20 text-fire-light shadow-fire/20' :
                  alert.type === 'medical' ? 'bg-medical/20 text-medical-light shadow-medical/20' :
                  alert.type === 'disaster' ? 'bg-disaster/20 text-disaster-light shadow-disaster/20' :
                  'bg-accident/20 text-accident-light shadow-accident/20'
                }
              `}
            >
              {alert.type} emergency
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold shadow-sm ${getStatusClass(alert.status)}`}>
              {alert.status}
            </span>
          </div>
          <DialogDescription className="text-gray-300 mt-2">
            {alert.description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh]">
          <div className="space-y-4 px-1 py-2">
            {/* Location details */}
            <div className="bg-black/30 rounded-lg p-3 border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 text-white mb-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <h4 className="font-medium">Location</h4>
              </div>
              <p className="text-gray-300 text-sm">
                {alert.location.address || 'No address provided'}
              </p>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Lat: {alert.location.latitude.toFixed(6)}</span>
                <span>Long: {alert.location.longitude.toFixed(6)}</span>
              </div>
            </div>

            {/* Reporter details */}
            <div className="bg-black/30 rounded-lg p-3 border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 text-white mb-2">
                <User className="h-4 w-4 text-blue-400" />
                <h4 className="font-medium">Reported by</h4>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-300 text-sm">{alert.reportedBy || 'Anonymous'}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(alert.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Image preview */}
            {alert.imageUrl && (
              <div className="mt-4">
                <img 
                  src={alert.imageUrl} 
                  alt="Emergency photo" 
                  className="w-full h-48 object-cover rounded-lg border border-white/10 hover:border-white/20 transition-colors" 
                />
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          {alert.status !== 'resolved' && (
            <>
              {alert.status === 'new' && (
                <Button 
                  onClick={() => handleStatusUpdate('viewed')}
                  className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 w-full`}
                >
                  Mark as Viewed
                </Button>
              )}
              {(alert.status === 'viewed' || alert.status === 'new') && (
                <Button 
                  onClick={() => handleStatusUpdate('responded')}
                  className={`bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/30 w-full`}
                >
                  Mark as Responded
                </Button>
              )}
              <Button 
                onClick={() => handleStatusUpdate('resolved')}
                className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 w-full`}
              >
                Mark as Resolved
              </Button>
            </>
          )}
          <Button 
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="border-white/20 hover:bg-white/10 w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
