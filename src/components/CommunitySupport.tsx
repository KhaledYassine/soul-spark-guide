
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Heart, Calendar, Award } from 'lucide-react';

const CommunitySupport: React.FC = () => {
  const supportGroups = [
    {
      name: 'Anxiety Support Circle',
      members: 234,
      activity: 'Active',
      description: 'A safe space to share experiences and coping strategies',
      nextSession: '2024-01-08 18:00'
    },
    {
      name: 'Depression Recovery',
      members: 189,
      activity: 'Active',
      description: 'Peer support for those on their recovery journey',
      nextSession: '2024-01-09 19:30'
    },
    {
      name: 'Mindfulness Practice',
      members: 156,
      activity: 'Moderate',
      description: 'Daily meditation and mindfulness exercises',
      nextSession: '2024-01-10 07:00'
    }
  ];

  const achievements = [
    { name: '7-Day Streak', icon: '🔥', earned: true },
    { name: 'Helpful Helper', icon: '🤝', earned: true },
    { name: 'Mindful Master', icon: '🧘', earned: false },
    { name: 'Community Champion', icon: '⭐', earned: false }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          Community Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Support Groups */}
        <div>
          <h4 className="text-sm font-medium mb-3">Support Groups</h4>
          <div className="space-y-3">
            {supportGroups.map((group, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{group.name}</h5>
                  <Badge variant={group.activity === 'Active' ? 'default' : 'secondary'}>
                    {group.activity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{group.members} members</span>
                  <span>Next: {new Date(group.nextSession).toLocaleDateString()}</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Join Discussion
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Award className="h-4 w-4 mr-1" />
            Achievements
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg border text-center ${
                  achievement.earned 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="text-lg">{achievement.icon}</div>
                <div className="text-xs font-medium">{achievement.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline">
            <Heart className="h-3 w-3 mr-1" />
            Send Support
          </Button>
          <Button size="sm" variant="outline">
            <Calendar className="h-3 w-3 mr-1" />
            Book Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunitySupport;
