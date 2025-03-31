
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface AlertLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Alert {
  id: string;
  type: 'fire' | 'medical' | 'disaster' | 'accident';
  title: string;
  description: string;
  location: AlertLocation;
  imageUrl?: string;
  timestamp: Date;
  status: 'new' | 'viewed' | 'responded' | 'resolved';
  reportedBy?: string;
}

interface AlertContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'status'>) => void;
  updateAlertStatus: (id: string, status: Alert['status']) => void;
  getAlertsByType: (type: Alert['type']) => Alert[];
  totalAlerts: number;
  newAlerts: number;
}

const AlertContext = createContext<AlertContextType>({
  alerts: [],
  addAlert: () => {},
  updateAlertStatus: () => {},
  getAlertsByType: () => [],
  totalAlerts: 0,
  newAlerts: 0,
});

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Get total number of alerts
  const totalAlerts = alerts.length;
  
  // Get number of new alerts
  const newAlerts = alerts.filter(alert => alert.status === 'new').length;

  // Add a new alert
  const addAlert = (alertData: Omit<Alert, 'id' | 'timestamp' | 'status'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      status: 'new',
    };
    
    setAlerts(prev => [newAlert, ...prev]);
    
    // Show toast notification
    toast({
      title: `New ${alertData.type} emergency reported`,
      description: alertData.title,
      variant: "destructive",
    });
  };

  // Update an alert's status
  const updateAlertStatus = (id: string, status: Alert['status']) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, status } : alert
      )
    );
  };

  // Get alerts by type
  const getAlertsByType = (type: Alert['type']) => {
    return alerts.filter(alert => alert.type === type);
  };

  return (
    <AlertContext.Provider value={{ 
      alerts, 
      addAlert, 
      updateAlertStatus, 
      getAlertsByType,
      totalAlerts,
      newAlerts,
    }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertContext);
