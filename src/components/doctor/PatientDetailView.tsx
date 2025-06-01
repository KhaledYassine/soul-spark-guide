
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowLeft, Heart, Activity, Moon, Brain, Calendar } from 'lucide-react';

interface PatientDetailProps {
  patientId: string;
  onBack: () => void;
}

const PatientDetailView: React.FC<PatientDetailProps> = ({ patientId, onBack }) => {
  const [dateRange, setDateRange] = useState('7d');

  // Mock patient data - replace with real API call
  const patientData = {
    id: patientId,
    name: 'Sarah Johnson',
    age: 28,
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    riskLevel: 'High',
    conditions: ['Severe Anxiety', 'Depression'],
    lastUpdate: new Date(),
    joinDate: new Date('2024-01-15'),
  };

  // Mock biometric data
  const biometricData = [
    { date: '2024-01-01', heartRate: 72, sleepQuality: 6, activityLevel: 65, mood: 3, energy: 3, stress: 4 },
    { date: '2024-01-02', heartRate: 78, sleepQuality: 5, activityLevel: 45, mood: 2, energy: 2, stress: 5 },
    { date: '2024-01-03', heartRate: 82, sleepQuality: 4, activityLevel: 30, mood: 2, energy: 2, stress: 5 },
    { date: '2024-01-04', heartRate: 85, sleepQuality: 3, activityLevel: 25, mood: 1, energy: 1, stress: 5 },
    { date: '2024-01-05', heartRate: 80, sleepQuality: 5, activityLevel: 40, mood: 3, energy: 2, stress: 4 },
    { date: '2024-01-06', heartRate: 75, sleepQuality: 6, activityLevel: 55, mood: 3, energy: 3, stress: 3 },
    { date: '2024-01-07', heartRate: 73, sleepQuality: 7, activityLevel: 70, mood: 4, energy: 4, stress: 2 },
  ];

  const currentMetrics = biometricData[biometricData.length - 1];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'destructive';
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">Schedule Session</Button>
          <Button>Contact Patient</Button>
        </div>
      </div>

      {/* Patient Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{patientData.name}</CardTitle>
              <p className="text-gray-600">Age: {patientData.age} • Joined: {patientData.joinDate.toLocaleDateString()}</p>
            </div>
            <Badge variant={getRiskColor(patientData.riskLevel)} className="text-sm">
              {patientData.riskLevel} Risk
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="text-xl font-semibold">{currentMetrics.heartRate} bpm</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Moon className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Sleep Quality</p>
                <p className="text-xl font-semibold">{currentMetrics.sleepQuality}/10</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Activity Level</p>
                <p className="text-xl font-semibold">{currentMetrics.activityLevel}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Mood Score</p>
                <p className="text-xl font-semibold">{currentMetrics.mood}/5</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Trend Analytics</CardTitle>
            <div className="flex gap-2">
              {['7d', '30d', '90d'].map((range) => (
                <Button
                  key={range}
                  variant={dateRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mood" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="mood">Mood & Mental</TabsTrigger>
              <TabsTrigger value="physical">Physical Health</TabsTrigger>
              <TabsTrigger value="sleep">Sleep Patterns</TabsTrigger>
              <TabsTrigger value="activity">Activity Levels</TabsTrigger>
            </TabsList>

            <TabsContent value="mood" className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={biometricData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis domain={[0, 5]} />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value: any, name: string) => [value, name]}
                  />
                  <Line type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={2} name="Mood" />
                  <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} name="Energy" />
                  <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="physical" className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={biometricData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value: any, name: string) => [value, name]}
                  />
                  <Area type="monotone" dataKey="heartRate" stroke="#ef4444" fill="#ef444440" name="Heart Rate (bpm)" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="sleep" className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={biometricData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis domain={[0, 10]} />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value: any, name: string) => [value, name]}
                  />
                  <Area type="monotone" dataKey="sleepQuality" stroke="#3b82f6" fill="#3b82f640" name="Sleep Quality" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={biometricData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value: any, name: string) => [`${value}%`, name]}
                  />
                  <Area type="monotone" dataKey="activityLevel" stroke="#10b981" fill="#10b98140" name="Activity Level" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Conditions & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {patientData.conditions.map((condition, index) => (
                <Badge key={index} variant="outline" className="mr-2">
                  {condition}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium">Last Session: Jan 5, 2024</p>
                  <p className="text-sm text-gray-600">Cognitive Behavioral Therapy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium">Next Session: Jan 12, 2024</p>
                  <p className="text-sm text-gray-600">Follow-up appointment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDetailView;
