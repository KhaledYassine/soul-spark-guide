
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import WeeklyChart from '@/components/WeeklyChart';
import HealthMetrics from '@/components/HealthMetrics';
import SmartNotifications from '@/components/SmartNotifications';
import WellnessScore from '@/components/WellnessScore';
import MentalHealthRisk from '@/components/MentalHealthRisk';
import CommunitySupport from '@/components/CommunitySupport';
import AdvancedAnalytics from '@/components/AdvancedAnalytics';
import PersonalizedInsights from '@/components/PersonalizedInsights';
import ProfessionalNotes from '@/components/doctor/ProfessionalNotes';
import TreatmentPlan from '@/components/doctor/TreatmentPlan';
import { useUserMode } from '@/contexts/UserModeContext';
import { BarChart3, Bell, Star, Brain, TrendingUp, Users, Stethoscope } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userMode, setUserMode, isDoctor } = useUserMode();

  // Mock data - in real app this would come from your health context/database
  const mockHealthData = {
    heartRate: 72,
    steps: 8432,
    energy: 4,
    happiness: 4
  };

  const mockWellnessData = {
    currentScore: 78,
    previousScore: 72,
    breakdown: {
      mood: 75,
      energy: 80,
      sleep: 70,
      stress: 25,
      activity: 85
    }
  };

  const mockMentalHealthData = {
    depressionRisk: 35,
    anxietyRisk: 45,
    overallRisk: 'Moderate' as const,
    riskFactors: [
      'Sleep disturbances (< 6 hours)',
      'Low social interaction',
      'High stress levels'
    ],
    protectiveFactors: [
      'Regular exercise routine',
      'Strong support network',
      'Consistent therapy attendance'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {isDoctor ? 'Professional Dashboard' : 'Mental Health Dashboard'}
            </h1>
            <div className="flex gap-2">
              <Button
                variant={userMode === 'patient' ? 'default' : 'outline'}
                onClick={() => setUserMode('patient')}
                size="sm"
              >
                <Users className="h-4 w-4 mr-1" />
                Patient View
              </Button>
              <Button
                variant={userMode === 'doctor' ? 'default' : 'outline'}
                onClick={() => setUserMode('doctor')}
                size="sm"
              >
                <Stethoscope className="h-4 w-4 mr-1" />
                Doctor View
              </Button>
            </div>
          </div>
          <p className="text-gray-600">
            {isDoctor 
              ? 'Professional tools and patient management features'
              : 'Track your wellness journey with detailed insights and analytics'
            }
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className={`grid w-full ${isDoctor ? 'grid-cols-6' : 'grid-cols-6'}`}>
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center">
              <Brain className="h-4 w-4 mr-1" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="wellness" className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              Wellness
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Community
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-1" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WeeklyChart />
              </div>
              <div className="space-y-6">
                <WellnessScore {...mockWellnessData} />
                {!isDoctor && <MentalHealthRisk {...mockMentalHealthData} />}
              </div>
            </div>
            
            <HealthMetrics {...mockHealthData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {isDoctor ? (
                <>
                  <ProfessionalNotes />
                  <TreatmentPlan />
                </>
              ) : (
                <>
                  <PersonalizedInsights />
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
                          <div className="font-medium text-blue-800">Log Mood</div>
                          <div className="text-sm text-blue-600">Track how you're feeling</div>
                        </button>
                        <button className="p-4 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
                          <div className="font-medium text-green-800">Start Exercise</div>
                          <div className="text-sm text-green-600">Begin a workout session</div>
                        </button>
                        <button className="p-4 bg-purple-50 rounded-lg text-left hover:bg-purple-100 transition-colors">
                          <div className="font-medium text-purple-800">Meditation</div>
                          <div className="text-sm text-purple-600">Practice mindfulness</div>
                        </button>
                        <button className="p-4 bg-orange-50 rounded-lg text-left hover:bg-orange-100 transition-colors">
                          <div className="font-medium text-orange-800">Chat Assistant</div>
                          <div className="text-sm text-orange-600">Get AI support</div>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PersonalizedInsights />
              {!isDoctor && <MentalHealthRisk {...mockMentalHealthData} />}
              <Card>
                <CardHeader>
                  <CardTitle>Goal Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <h4 className="font-medium text-gray-800">Weekly Goals</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Mood tracking</span>
                          <span className="text-green-600">6/7 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Exercise sessions</span>
                          <span className="text-blue-600">4/5 sessions</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Meditation minutes</span>
                          <span className="text-purple-600">85/100 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wellness">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WellnessScore {...mockWellnessData} />
              <Card>
                <CardHeader>
                  <CardTitle>Wellness Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800">Breathing Exercise</h4>
                      <p className="text-sm text-blue-600">4-7-8 breathing technique for anxiety relief</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800">Progressive Muscle Relaxation</h4>
                      <p className="text-sm text-green-600">Release tension and promote relaxation</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800">Guided Meditation</h4>
                      <p className="text-sm text-purple-600">Mindfulness meditation for mental clarity</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CommunitySupport />
              {isDoctor && <TreatmentPlan />}
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <SmartNotifications />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
