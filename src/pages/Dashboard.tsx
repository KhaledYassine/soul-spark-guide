
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHealth } from '@/contexts/HealthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Heart, Activity, TrendingUp, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { statusRatings, healthStats } = useHealth();
  const navigate = useNavigate();

  // Get user assessment data
  const userAssessment = JSON.parse(localStorage.getItem('userAssessment') || '{}');

  const getStatusColor = (value: number) => {
    if (value >= 4) return 'text-green-600 bg-green-50';
    if (value >= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-mental-lightGray to-white">
      <header className="p-4 flex justify-between items-center border-b bg-white">
        <Button variant="ghost" onClick={() => navigate('/home')} className="px-2">
          &larr;
        </Button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="w-8"></div>
      </header>
      
      <main className="flex-1 p-4 space-y-6">
        {/* User Profile Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Profile Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nickname</p>
                <p className="font-semibold">{userAssessment.nickname || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-semibold">{userAssessment.age || 'Not set'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Mental State</p>
                <p className="font-semibold capitalize">{userAssessment.mentalState || 'Not assessed'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>Health Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="text-2xl font-bold">{healthStats.heartRate} bpm</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Steps Today</p>
                <p className="text-2xl font-bold">{healthStats.steps.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Ratings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Current Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(statusRatings).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="font-medium capitalize">{key}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(value)}`}>
                    {value}/5
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wellness Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Wellness Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Average Mood Score</p>
                <p className="text-lg font-semibold text-blue-600">
                  {((statusRatings.happiness + statusRatings.energy - statusRatings.stress + statusRatings.productivity) / 4).toFixed(1)}/5
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Days Active</p>
                <p className="text-lg font-semibold text-green-600">7 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
