
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Phone, FileText } from 'lucide-react';

interface Alert {
  id: string;
  patientName: string;
  patientId: string;
  condition: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  suggestedAction: string;
  timestamp: Date;
  isRead: boolean;
}

interface AlertPanelProps {
  alerts: Alert[];
  onMarkAsRead: (alertId: string) => void;
  onTakeAction: (alert: Alert) => void;
}

const AlertPanel: React.FC<AlertPanelProps> = ({
  alerts,
  onMarkAsRead,
  onTakeAction,
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    const baseClasses = "h-4 w-4";
    switch (severity) {
      case 'Critical':
      case 'High':
        return <AlertTriangle className={`${baseClasses} text-red-600`} />;
      case 'Medium':
        return <AlertTriangle className={`${baseClasses} text-yellow-600`} />;
      default:
        return <AlertTriangle className={`${baseClasses} text-blue-600`} />;
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Call') || action.includes('Contact')) {
      return <Phone className="h-4 w-4" />;
    }
    if (action.includes('Referral') || action.includes('Emergency')) {
      return <FileText className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const sortedAlerts = alerts.sort((a, b) => {
    const severityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
    return severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder];
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
          Alert Panel
          {alerts.filter(a => !a.isRead).length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {alerts.filter(a => !a.isRead).length} New
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedAlerts.length > 0 ? (
          <div className="space-y-3">
            {sortedAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${
                  !alert.isRead ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{alert.patientName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">
                        Detected: {alert.condition}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Suggested: {alert.suggestedAction}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onTakeAction(alert)}
                      className="flex items-center gap-1"
                    >
                      {getActionIcon(alert.suggestedAction)}
                      Action
                    </Button>
                    {!alert.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onMarkAsRead(alert.id)}
                        className="text-xs"
                      >
                        Mark Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No active alerts</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertPanel;
