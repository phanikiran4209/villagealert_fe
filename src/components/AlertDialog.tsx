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
import { Flame, Stethoscope, CloudLightning, Car, MapPin, Clock, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AlertDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ alert, open, onOpenChange }) => {
  const { updateAlertStatus } = useAlerts();

  if (!alert) return null;

  const handleStatusUpdate = (status: Alert['status']) => {
    updateAlertStatus(alert.id, status);
    onOpenChange(false);
  };

  const getAlertTypeIcon = (type: Alert['type']) => {
    const iconClass = "h-6 w-6";
    switch (type) {
      case 'fire': return <Flame className={`${iconClass} text-orange-500 animate-pulse`} />;
      case 'medical': return <Stethoscope className={`${iconClass} text-red-500`} />;
      case 'disaster': return <CloudLightning className={`${iconClass} text-purple-500 animate-bounce`} />;
      case 'accident': return <Car className={`${iconClass} text-yellow-500`} />;
    }
  };

  const getStatusStyle = (status: Alert['status']) => {
    switch (status) {
      case 'new': return 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse';
      case 'viewed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'responded': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getTypeGradient = (type: Alert['type']) => {
    switch (type) {
      case 'fire': return 'from-orange-600 via-red-600 to-orange-700';
      case 'medical': return 'from-red-600 via-pink-600 to-red-700';
      case 'disaster': return 'from-purple-600 via-indigo-600 to-purple-700';
      case 'accident': return 'from-yellow-600 via-amber-600 to-yellow-700';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 shadow-2xl shadow-black/50 rounded-2xl w-[90vw] max-w-md max-h-[80vh] overflow-hidden text-white backdrop-blur-2xl">
        {/* Header */}
        <DialogHeader className="relative p-4">
          <div className={`absolute inset-0 h-16 bg-gradient-to-r ${getTypeGradient(alert.type)} opacity-20 rounded-t-2xl`}></div>
          <div className="relative flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-lg border border-white/20">
              {getAlertTypeIcon(alert.type)}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300 truncate">
                {alert.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(alert.status)} border`}>
                  {alert.status.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <ScrollArea className="max-h-[50vh] px-4 py-2">
          <div className="space-y-4">
            {/* Description */}
            <DialogDescription className="text-gray-200 text-sm leading-relaxed bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
              {alert.description || 'No description provided.'}
            </DialogDescription>

            {/* Location Card */}
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-red-400 animate-bounce" />
                <h3 className="font-semibold text-white text-sm">Location Details</h3>
              </div>
              <p className="text-gray-300 text-sm ml-6 truncate">
                {alert.location.address || 'Address not specified'}
              </p>
              <div className="flex justify-between text-xs text-gray-400 mt-2 ml-6">
                <span>Lat: {alert.location.latitude.toFixed(6)}</span>
                <span>Lon: {alert.location.longitude.toFixed(6)}</span>
              </div>
            </div>

            {/* Reporter Card */}
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-blue-400" />
                <h3 className="font-semibold text-white text-sm">Reported By</h3>
              </div>
              <p className="text-gray-300 text-sm ml-6 truncate">
                {alert.reportedBy || 'Anonymous User'}
              </p>
            </div>

            {/* Image Preview */}
            {alert.imageUrl && (
              <div className="relative group">
                <img 
                  src={alert.imageUrl} 
                  alt="Emergency scene" 
                  className="w-full h-48 object-cover rounded-lg border border-gray-700/50 group-hover:border-gray-600 transition-all"
                />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer with Action Buttons */}
        <DialogFooter className="p-4 pt-0 flex flex-wrap gap-2 bg-gray-900/50 border-t border-gray-700/50">
          {alert.status !== 'resolved' && (
            <>
              {alert.status === 'new' && (
                <Button 
                  onClick={() => handleStatusUpdate('viewed')}
                  className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[120px] text-sm transition-all duration-300 shadow-lg shadow-blue-500/20"
                >
                  Mark Viewed
                </Button>
              )}
              {(alert.status === 'viewed' || alert.status === 'new') && (
                <Button 
                  onClick={() => handleStatusUpdate('responded')}
                  className="bg-amber-600 hover:bg-amber-700 flex-1 min-w-[120px] text-sm transition-all duration-300 shadow-lg shadow-amber-500/20"
                >
                  Mark Responded
                </Button>
              )}
              <Button 
                onClick={() => handleStatusUpdate('resolved')}
                className="bg-green-600 hover:bg-green-700 flex-1 min-w-[120px] text-sm transition-all duration-300 shadow-lg shadow-green-500/20"
              >
                Mark Resolved
              </Button>
            </>
          )}
          <Button 
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="flex-1 min-w-[120px] text-sm border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;