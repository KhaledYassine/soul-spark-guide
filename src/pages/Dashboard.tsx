
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useHealth } from '@/contexts/HealthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Heart, Activity, Brain, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { healthData } = useHealth();
  const navigate = useNavigate();

  const getStatusColor = (value: number, type: 'stress' | 'other' = 'other') => {
    if (type === 'stress') {
      // For stress, lower is better
      if (value <= 2) return 'text-green-600 bg-green-100';
      if (value <= 3) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    } else {
      // For energy, happiness, productivity, higher is better
      if (value >= 4) return 'text-green-600 bg-green-100';
      if (value >= 3) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mental-lightGray to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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
          <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        </div>

        {/* Profile Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-mental-purple">
              <User className="h-5 w-5 mr-2" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Nickname</p>
              <p className="text-lg">{user?.nickname || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Age</p>
              <p className="text-lg">{user?.age || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Mental State</p>
              <p className="text-lg capitalize">{user?.mentalState || 'Not assessed'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Professional Support</p>
              <p className="text-lg">{user?.hasSeenDoctor ? 'Yes' : 'No'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-mental-purple">
                <Heart className="h-5 w-5 mr-2" />
                Physical Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Heart Rate</span>
                <span className="font-semibold">{healthData.heartRate} bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Steps Today</span>
                <span className="font-semibold">{healthData.steps.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-mental-purple">
                <Brain className="h-5 w-5 mr-2" />
                Mental Wellness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Energy</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(healthData.energy)}`}>
                  {healthData.energy}/5
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Happiness</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(healthData.happiness)}`}>
                  {healthData.happiness}/5
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Productivity</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(healthData.productivity)}`}>
                  {healthData.productivity}/5
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stress</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(healthData.stress, 'stress')}`}>
                  {healthData.stress}/5
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Last Update */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">
                Last updated: {healthData.lastUpdated.toLocaleDateString()} at {healthData.lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
