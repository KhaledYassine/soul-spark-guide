
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangle, Brain, Info } from 'lucide-react';

interface MentalHealthRiskProps {
  depressionRisk: number;
  anxietyRisk: number;
  overallRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
  riskFactors: string[];
  protectiveFactors: string[];
}

const MentalHealthRisk: React.FC<MentalHealthRiskProps> = ({
  depressionRisk,
  anxietyRisk,
  overallRisk,
  riskFactors,
  protectiveFactors
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Moderate': return 'text-yellow-600';
      case 'High': return 'text-orange-600';
      case 'Severe': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Low': return { label: 'Low Risk', variant: 'default' as const };
      case 'Moderate': return { label: 'Moderate Risk', variant: 'secondary' as const };
      case 'High': return { label: 'High Risk', variant: 'destructive' as const };
      case 'Severe': return { label: 'Severe Risk', variant: 'destructive' as const };
      default: return { label: 'Unknown', variant: 'outline' as const };
    }
  };

  const riskBadge = getRiskBadge(overallRisk);

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-500" />
              Mental Health Risk Assessment
            </span>
            <Badge variant={riskBadge.variant}>{riskBadge.label}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-help">
                        <span className="text-sm font-medium">Depression Risk</span>
                        <Info className="h-3 w-3 ml-1 text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Based on mood patterns, energy levels, sleep quality, and behavioral indicators over the past 30 days</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className={`text-sm font-medium ${getRiskColor(depressionRisk > 70 ? 'Severe' : depressionRisk > 50 ? 'High' : depressionRisk > 30 ? 'Moderate' : 'Low')}`}>
                    {depressionRisk}%
                  </span>
                </div>
                <Progress value={depressionRisk} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-help">
                        <span className="text-sm font-medium">Anxiety Risk</span>
                        <Info className="h-3 w-3 ml-1 text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Calculated from stress levels, heart rate variability, sleep disturbances, and reported anxiety symptoms</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className={`text-sm font-medium ${getRiskColor(anxietyRisk > 70 ? 'Severe' : anxietyRisk > 50 ? 'High' : anxietyRisk > 30 ? 'Moderate' : 'Low')}`}>
                    {anxietyRisk}%
                  </span>
                </div>
                <Progress value={anxietyRisk} className="h-2" />
              </div>
            </div>

            {riskFactors.length > 0 && (
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                  <h4 className="text-sm font-medium text-red-800">Risk Factors</h4>
                </div>
                <div className="text-xs text-red-700 space-y-1">
                  {riskFactors.map((factor, index) => (
                    <p key={index}>• {factor}</p>
                  ))}
                </div>
              </div>
            )}

            {protectiveFactors.length > 0 && (
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-green-800 mb-1">
                  Protective Factors
                </h4>
                <div className="text-xs text-green-700 space-y-1">
                  {protectiveFactors.map((factor, index) => (
                    <p key={index}>• {factor}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default MentalHealthRisk;
