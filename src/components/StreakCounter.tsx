
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Calendar, Target, Award } from 'lucide-react';

interface StreakData {
  current: number;
  longest: number;
  lastCheckIn: Date | null;
  weeklyGoal: number;
  weeklyProgress: number;
}

const StreakCounter: React.FC = () => {
  const streakData: StreakData = {
    current: 7,
    longest: 14,
    lastCheckIn: new Date(),
    weeklyGoal: 7,
    weeklyProgress: 5
  };

  const achievements = [
    { name: '3-Day Streak', days: 3, achieved: true },
    { name: '7-Day Streak', days: 7, achieved: true },
    { name: '14-Day Streak', days: 14, achieved: false },
    { name: '30-Day Streak', days: 30, achieved: false }
  ];

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const canCheckIn = !isToday(streakData.lastCheckIn);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Flame className="h-5 w-5 mr-2 text-orange-500" />
          Daily Check-in Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Streak */}
        <div className="text-center bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Flame className="h-8 w-8 text-orange-500 mr-2" />
            <span className="text-3xl font-bold text-orange-600">{streakData.current}</span>
          </div>
          <p className="text-sm text-gray-600">Current Streak</p>
          <Badge className="mt-2 bg-orange-100 text-orange-600">
            🏆 Personal Best: {streakData.longest} days
          </Badge>
        </div>

        {/* Weekly Progress */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Weekly Goal</span>
            <span className="text-sm text-gray-600">{streakData.weeklyProgress}/{streakData.weeklyGoal}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(streakData.weeklyProgress / streakData.weeklyGoal) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Check-in Button */}
        <Button 
          className="w-full" 
          disabled={!canCheckIn}
          variant={canCheckIn ? "default" : "secondary"}
        >
          <Calendar className="h-4 w-4 mr-2" />
          {canCheckIn ? 'Complete Today\'s Check-in' : 'Already Checked In Today ✓'}
        </Button>

        {/* Achievements */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Award className="h-4 w-4 mr-1" />
            Streak Achievements
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg border text-center text-xs ${
                  achievement.achieved 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}
              >
                <div className="font-medium">{achievement.name}</div>
                <div className="text-xs">
                  {achievement.achieved ? '✓ Unlocked' : `${achievement.days} days`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <Target className="h-6 w-6 text-purple-500 mx-auto mb-1" />
          <p className="text-sm text-purple-700 font-medium">
            {streakData.current >= 7 ? 
              "Amazing consistency! Keep it up!" : 
              `${7 - streakData.current} more days to unlock the 7-day badge!`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;
