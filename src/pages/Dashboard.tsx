
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHealth } from '@/contexts/HealthContext';
import WeeklyChart from '@/components/WeeklyChart';
import HealthMetrics from '@/components/HealthMetrics';
import { ArrowLeft, TrendingUp, Calendar, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { healthData } = useHealth();
  const navigate = useNavigate();

  const getStreakDays = () => Math.floor(Math.random() * 14) + 1;
  const getWeeklyAverage = (metric: string) => {
    const base = healthData[metric as keyof typeof healthData] as number;
    return (base + Math.random() * 0.5 - 0.25).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mental-lightGray to-white p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/home')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Wellness Dashboard</h1>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                Check-in Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{getStreakDays()}</span>
                <Badge className="bg-green-500 text-white">Days</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-medium">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                Weekly Average Mood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{getWeeklyAverage('happiness')}</span>
                <Badge variant="outline">Out of 5</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-medium">
                <Award className="h-4 w-4 mr-2 text-purple-500" />
                Wellness Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {Math.round((healthData.happiness + healthData.energy + (5 - healthData.stress)) / 3 * 20)}
                </span>
                <Badge className="bg-purple-500 text-white">%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Health Metrics */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-mental-purple">Current Health Metrics</h2>
          <HealthMetrics
            heartRate={healthData.heartRate}
            steps={healthData.steps}
            energy={healthData.energy}
            happiness={healthData.happiness}
          />
        </div>

        {/* Weekly Trends */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-mental-purple">Weekly Trends</h2>
          <WeeklyChart />
        </div>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-mental-purple">Weekly Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-green-800">
                <strong>Great progress!</strong> Your mood has improved by 15% this week.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Your energy levels are highest on days when you complete breathing exercises.
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-yellow-800">
                <strong>Notice:</strong> Stress levels tend to peak on weekdays. Consider scheduling more relaxation time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
