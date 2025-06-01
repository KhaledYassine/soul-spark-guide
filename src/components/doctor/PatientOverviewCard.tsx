
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  lastUpdate: Date;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  conditions: string[];
  lastMoodScore: number;
  lastEnergyScore: number;
  lastStressScore: number;
  trend: 'improving' | 'stable' | 'declining';
}

interface PatientOverviewCardProps {
  patient: Patient;
  onViewDetails: (patientId: string) => void;
  onContact: (patientId: string) => void;
}

const PatientOverviewCard: React.FC<PatientOverviewCardProps> = ({
  patient,
  onViewDetails,
  onContact,
}) => {
  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'destructive';
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{patient.name}</CardTitle>
          <Badge variant={getRiskBadgeVariant(patient.riskLevel)}>
            {patient.riskLevel} Risk
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          Last update: {formatLastUpdate(patient.lastUpdate)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Age: {patient.age}</span>
          <div className="flex items-center">
            {getTrendIcon(patient.trend)}
            <span className="text-sm ml-1 capitalize">{patient.trend}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Recent Scores:</div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="text-center">
              <div className="font-medium">Mood</div>
              <div className={`${patient.lastMoodScore >= 4 ? 'text-green-600' : patient.lastMoodScore >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                {patient.lastMoodScore}/5
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">Energy</div>
              <div className={`${patient.lastEnergyScore >= 4 ? 'text-green-600' : patient.lastEnergyScore >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                {patient.lastEnergyScore}/5
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">Stress</div>
              <div className={`${patient.lastStressScore <= 2 ? 'text-green-600' : patient.lastStressScore <= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                {patient.lastStressScore}/5
              </div>
            </div>
          </div>
        </div>

        {patient.conditions.length > 0 && (
          <div className="space-y-1">
            <div className="text-sm font-medium">Conditions:</div>
            <div className="flex flex-wrap gap-1">
              {patient.conditions.map((condition, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(patient.id)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onContact(patient.id)}
            className="flex-1"
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientOverviewCard;
