
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, CheckCircle, Clock } from 'lucide-react';

interface TreatmentGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: Date;
  status: 'active' | 'completed' | 'pending';
  category: string;
}

const TreatmentPlan: React.FC = () => {
  const [goals] = useState<TreatmentGoal[]>([
    {
      id: '1',
      title: 'Reduce Anxiety Symptoms',
      description: 'Practice daily breathing exercises and mindfulness',
      progress: 65,
      dueDate: new Date('2024-02-15'),
      status: 'active',
      category: 'Anxiety Management'
    },
    {
      id: '2',
      title: 'Improve Sleep Quality',
      description: 'Establish consistent sleep schedule and bedtime routine',
      progress: 80,
      dueDate: new Date('2024-01-30'),
      status: 'active',
      category: 'Sleep Hygiene'
    },
    {
      id: '3',
      title: 'Social Engagement',
      description: 'Attend social activities at least twice per week',
      progress: 45,
      dueDate: new Date('2024-03-01'),
      status: 'active',
      category: 'Social Skills'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'active': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2 text-green-500" />
          Treatment Plan & Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{goals.filter(g => g.status === 'active').length}</div>
            <div className="text-xs text-blue-600">Active Goals</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{goals.filter(g => g.status === 'completed').length}</div>
            <div className="text-xs text-green-600">Completed</div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
            </div>
            <div className="text-xs text-orange-600">Avg Progress</div>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          <h4 className="font-medium">Current Goals</h4>
          {goals.map((goal) => (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">{goal.title}</h5>
                <Badge variant={getStatusColor(goal.status)}>
                  {goal.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Due: {goal.dueDate.toLocaleDateString()}
                </span>
                <Badge variant="outline" className="text-xs">
                  {goal.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline">
            <CheckCircle className="h-3 w-3 mr-1" />
            Update Progress
          </Button>
          <Button size="sm" variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Schedule Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentPlan;
