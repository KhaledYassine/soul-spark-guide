import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useHealth } from '@/contexts/HealthContext';
import WellnessScore from '@/components/WellnessScore';
import MentalHealthRisk from '@/components/MentalHealthRisk';
import CommunitySupport from '@/components/CommunitySupport';
import StreakCounter from '@/components/StreakCounter';
import AssessmentAnalytics from '@/components/assessment/AssessmentAnalytics';
import GoalSetting from '@/components/assessment/GoalSetting';
import MedicationReminders from '@/components/assessment/MedicationReminders';
import CrisisSupport from '@/components/assessment/CrisisSupport';
import { User, Target, Calendar, Heart, Brain, Activity } from 'lucide-react';

const Assessment: React.FC = () => {
  const { user } = useAuth();
  const { healthData } = useHealth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-mental-lightGray to-white p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Wellness Profile</h1>
          <p className="text-gray-600">Track your progress and manage your mental health journey</p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-600">Wellness</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-sm text-gray-600">Days Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Check-ins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">3/5</div>
              <div className="text-sm text-gray-600">Goals</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <WellnessScore />
            <MentalHealthRisk />
            <StreakCounter />
            <GoalSetting />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <CommunitySupport />
            <AssessmentAnalytics />
            <MedicationReminders />
            <CrisisSupport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
