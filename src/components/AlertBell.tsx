
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, useAlerts } from '@/context/AlertContext';
import { Bell } from 'lucide-react';

interface AlertBellProps {
  onAlertClick: (alert: Alert) => void;
}

const AlertBell: React.FC<AlertBellProps> = ({ onAlertClick }) => {
  const { alerts, newAlerts } = useAlerts();
  const [isOpen, setIsOpen] = useState(false);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <>
      {/* Bell Button */}
      <div className="fixed bottom-24 right-8 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative rounded-full w-14 h-14 p-0 bg-gradient-to-r from-red-500 to-red-600
            hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300
            ${isOpen ? 'ring-2 ring-white scale-110' : ''}
            ${newAlerts > 0 ? 'animate-[bell-shake_0.5s_ease-in-out]' : ''}
          `}
          aria-label="Alerts"
        >
          <Bell className="h-6 w-6 text-white" />
          
          {/* Notification Badge */}
          {newAlerts > 0 && (
            <>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center border-2 border-white">
                {newAlerts}
              </span>
              <span className="absolute w-full h-full rounded-full bg-red-500 animate-pulse opacity-75"></span>
            </>
          )}
        </Button>
      </div>

      {/* Alerts Panel */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed bottom-40 right-8 w-72 max-h-96 overflow-y-auto bg-gray-900/90 backdrop-blur-xl rounded-lg border border-white/10 shadow-xl z-40 p-3">
            <h3 className="text-white font-bold mb-2 pb-2 border-b border-gray-700">Recent Alerts</h3>
            
            {alerts.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No alerts</p>
            ) : (
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`
                      p-3 rounded-md cursor-pointer transition-all border
                      ${
                        alert.status === 'new' 
                          ? 'bg-black/60 border-white/20 shadow-md' 
                          : 'bg-black/40 border-white/10'
                      }
                      ${
                        alert.type === 'fire' ? 'hover:border-fire/50' :
                        alert.type === 'medical' ? 'hover:border-medical/50' :
                        alert.type === 'disaster' ? 'hover:border-disaster/50' :
                        'hover:border-accident/50'
                      }
                      hover:bg-black/70
                    `}
                    onClick={() => {
                      onAlertClick(alert);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium text-white ${alert.status === 'new' ? 'font-bold' : ''}`}>
                        {alert.title}
                      </h4>
                      <span 
                        className={`
                          text-xs px-2 py-1 rounded-full
                          ${
                            alert.type === 'fire' ? 'bg-fire/20 text-fire-light' :
                            alert.type === 'medical' ? 'bg-medical/20 text-medical-light' :
                            alert.type === 'disaster' ? 'bg-disaster/20 text-disaster-light' :
                            'bg-accident/20 text-accident-light'
                          }
                        `}
                      >
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {alert.description.length > 50 
                        ? `${alert.description.substring(0, 50)}...` 
                        : alert.description
                      }
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                      {alert.status === 'new' && (
                        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AlertBell;
