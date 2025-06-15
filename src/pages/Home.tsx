
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useHealth } from '@/contexts/HealthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { useNavigate } from 'react-router-dom';
import HealthMetrics from '@/components/HealthMetrics';
import StatusSlider from '@/components/StatusSlider';
import MoodTracker from '@/components/MoodTracker';
import BreathingExercise from '@/components/BreathingExercise';
import WeeklyChart from '@/components/WeeklyChart';
import GratitudeJournal from '@/components/GratitudeJournal';
import WellnessTips from '@/components/WellnessTips';
import { 
  MessageSquare, 
  Settings, 
  Bell, 
  Database, 
  TrendingUp, 
  Target, 
  Calendar,
  Zap,
  Award,
  Sun,
  Moon,
  Coffee
} from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { healthData, updateStatus } = useHealth();
  const { unreadCount } = useNotifications();
  const { isRealmReady, syncPreference, saveEncryptedData } = useDatabase();
  const navigate = useNavigate();
  const [quickMood, setQuickMood] = useState<string>('');

  const handleStatusUpdate = async (type: string, value: number) => {
    const updatedStatus = {
      energy: type === 'energy' ? value : healthData.energy,
      happiness: type === 'happiness' ? value : healthData.happiness,
      productivity: type === 'productivity' ? value : healthData.productivity,
      stress: type === 'stress' ? value : healthData.stress,
    };
    
    updateStatus(updatedStatus);
    
    await saveEncryptedData({
      type: 'mood_log',
      data: updatedStatus,
      timestamp: new Date(),
    }, 'mood');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: Sun };
    if (hour < 17) return { text: 'Good Afternoon', icon: Coffee };
    return { text: 'Good Evening', icon: Moon };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  const wellnessScore = Math.round(
    (healthData.energy + healthData.happiness + healthData.productivity + (100 - healthData.stress)) / 4
  );

  const quickMoods = [
    { emoji: '😊', label: 'Great', value: 'great' },
    { emoji: '🙂', label: 'Good', value: 'good' },
    { emoji: '😐', label: 'Okay', value: 'okay' },
    { emoji: '😕', label: 'Low', value: 'low' },
    { emoji: '😢', label: 'Difficult', value: 'difficult' }
  ];

  const todayGoals = [
    { id: 1, text: 'Take 3 mindful breaths', completed: true },
    { id: 2, text: '10 minutes meditation', completed: false },
    { id: 3, text: 'Gratitude journal entry', completed: true },
    { id: 4, text: 'Go for a walk', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mental-lightGray via-white to-mental-softGreen p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex justify-between items-start">
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-2">
              <GreetingIcon className="h-6 w-6 text-mental-purple" />
              <h1 className="text-3xl font-bold text-gray-900">
                {greeting.text}, {user?.nickname || 'there'}!
              </h1>
            </div>
            <p className="text-gray-600">Let's check in on your wellness journey</p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Wellness Score: {wellnessScore}%</span>
              </div>
              <Badge variant="outline" className="text-mental-purple border-mental-purple">
                Day 7 Streak! 🔥
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/settings')}
              className="relative hover:scale-105 transition-transform"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="relative hover:scale-105 transition-transform"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Quick Mood Check */}
        <Card className="border-l-4 border-l-mental-purple shadow-lg bg-gradient-to-r from-white to-mental-lightGray">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Mood Check</h3>
                <p className="text-sm text-gray-600">How are you feeling right now?</p>
              </div>
              <Zap className="h-5 w-5 text-mental-purple" />
            </div>
            <div className="flex space-x-3">
              {quickMoods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setQuickMood(mood.value)}
                  className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                    quickMood === mood.value 
                      ? 'bg-mental-purple text-white shadow-lg' 
                      : 'bg-white hover:bg-mental-lightGray'
                  }`}
                >
                  <div className="text-lg">{mood.emoji}</div>
                  <div className="text-xs font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Goals */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-mental-purple">
              <Target className="h-5 w-5 mr-2" />
              Today's Wellness Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayGoals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    goal.completed 
                      ? 'bg-mental-purple border-mental-purple' 
                      : 'border-gray-300'
                  }`}>
                    {goal.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className={goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                    {goal.text}
                  </span>
                  {goal.completed && <Award className="h-4 w-4 text-yellow-500" />}
                </div>
              ))}
            </div>
            <Progress value={50} className="mt-4" />
            <p className="text-sm text-gray-600 mt-2">2 of 4 goals completed</p>
          </CardContent>
        </Card>

        {/* Database Status */}
        <Card className="border-l-4 border-l-mental-purple">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-mental-purple" />
                <span className="text-sm font-medium">
                  Database: {isRealmReady ? 'Connected' : 'Disconnected'}
                </span>
                <div className={`w-2 h-2 rounded-full ${isRealmReady ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
              <Badge variant="outline" className="text-xs">
                Sync: {syncPreference}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Health Metrics */}
        <HealthMetrics
          heartRate={healthData.heartRate}
          steps={healthData.steps}
          energy={healthData.energy}
          happiness={healthData.happiness}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Enhanced Status Check-in */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-mental-purple flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Status Check-in
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <StatusSlider
                  label="Energy Level"
                  value={healthData.energy}
                  onChange={(value) => handleStatusUpdate('energy', value)}
                  colorClass="bg-yellow-100 text-yellow-600"
                />
                <StatusSlider
                  label="Happiness"
                  value={healthData.happiness}
                  onChange={(value) => handleStatusUpdate('happiness', value)}
                  colorClass="bg-green-100 text-green-600"
                />
                <StatusSlider
                  label="Productivity"
                  value={healthData.productivity}
                  onChange={(value) => handleStatusUpdate('productivity', value)}
                  colorClass="bg-blue-100 text-blue-600"
                />
                <StatusSlider
                  label="Stress Level"
                  value={healthData.stress}
                  onChange={(value) => handleStatusUpdate('stress', value)}
                  colorClass="bg-red-100 text-red-600"
                />
              </CardContent>
            </Card>

            <MoodTracker />
            <GratitudeJournal />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <WeeklyChart />
            <BreathingExercise />
            <WellnessTips />
          </div>
        </div>

        {/* Enhanced Chat Assistant */}
        <Card className="shadow-2xl bg-gradient-to-r from-mental-purple to-mental-darkPurple text-white">
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-3">Your AI Wellness Companion</h3>
            <p className="opacity-90 mb-6 text-lg">
              Ready for a supportive conversation? I'm here to listen, guide, and help you navigate your mental wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/chat')}
                variant="secondary"
                size="lg"
                className="bg-white text-mental-purple hover:bg-gray-100 shadow-lg"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Conversation
              </Button>
              <Button 
                onClick={() => navigate('/assessment')}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Calendar className="h-5 w-5 mr-2" />
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
