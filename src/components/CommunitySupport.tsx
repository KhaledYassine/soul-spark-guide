
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MessageSquare, Heart, Calendar, Award, Plus, Send, ThumbsUp, Share2 } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  category: 'experience' | 'milestone' | 'support' | 'tip';
}

interface Story {
  id: string;
  author: string;
  title: string;
  excerpt: string;
  timestamp: Date;
  category: string;
}

const CommunitySupport: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'stories' | 'groups'>('feed');

  const posts: Post[] = [
    {
      id: '1',
      author: 'Sarah M.',
      content: 'Had a breakthrough in therapy today! Learning to manage my anxiety with breathing exercises. Small steps but feeling hopeful 💪',
      timestamp: new Date('2024-01-07 14:30'),
      likes: 12,
      comments: 3,
      category: 'milestone'
    },
    {
      id: '2',
      author: 'Alex K.',
      content: 'Completed my 7-day meditation streak! The daily check-ins really help keep me accountable. Anyone else finding mindfulness helpful?',
      timestamp: new Date('2024-01-07 10:15'),
      likes: 8,
      comments: 5,
      category: 'experience'
    },
    {
      id: '3',
      author: 'Jordan R.',
      content: 'Sharing a quick tip: When overwhelmed, I write down 3 things I can control right now. It helps bring focus back to the present moment.',
      timestamp: new Date('2024-01-06 16:45'),
      likes: 15,
      comments: 7,
      category: 'tip'
    }
  ];

  const stories: Story[] = [
    {
      id: '1',
      author: 'Maya P.',
      title: 'My Journey with Social Anxiety',
      excerpt: 'How I went from avoiding social situations to finding my confidence again...',
      timestamp: new Date('2024-01-05'),
      category: 'Recovery Story'
    },
    {
      id: '2',
      author: 'Chris L.',
      title: 'Finding Peace in Daily Routines',
      excerpt: 'Creating structure helped me manage depression and find small joys...',
      timestamp: new Date('2024-01-03'),
      category: 'Coping Strategy'
    }
  ];

  const supportGroups = [
    {
      name: 'Anxiety Support Circle',
      members: 234,
      activity: 'Active',
      lastPost: '2 hours ago'
    },
    {
      name: 'Depression Recovery',
      members: 189,
      activity: 'Active',
      lastPost: '4 hours ago'
    },
    {
      name: 'Mindfulness Practice',
      members: 156,
      activity: 'Moderate',
      lastPost: '1 day ago'
    }
  ];

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    // Add new post logic here
    setNewPost('');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone': return 'bg-green-100 text-green-600';
      case 'experience': return 'bg-blue-100 text-blue-600';
      case 'tip': return 'bg-purple-100 text-purple-600';
      case 'support': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          Community Support
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'feed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('feed')}
          >
            Feed
          </Button>
          <Button
            variant={activeTab === 'stories' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('stories')}
          >
            Stories
          </Button>
          <Button
            variant={activeTab === 'groups' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('groups')}
          >
            Groups
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeTab === 'feed' && (
          <>
            {/* Create Post */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-blue-800">Share with Community</h4>
              <Textarea
                placeholder="Share your experience, milestone, or support others..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={3}
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="text-xs">Experience</Badge>
                  <Badge variant="outline" className="text-xs">Milestone</Badge>
                  <Badge variant="outline" className="text-xs">Support</Badge>
                </div>
                <Button onClick={handlePostSubmit} size="sm">
                  <Send className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{post.author}</p>
                        <p className="text-xs text-gray-500">
                          {post.timestamp.toLocaleDateString()} at {post.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Heart className="h-3 w-3 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'stories' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Shared Experiences</h4>
              <Button size="sm" variant="outline">
                <Plus className="h-3 w-3 mr-1" />
                Share Story
              </Button>
            </div>
            {stories.map((story) => (
              <div key={story.id} className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">{story.category}</Badge>
                  <span className="text-xs text-gray-500">{story.timestamp.toLocaleDateString()}</span>
                </div>
                <h5 className="font-medium mb-1">{story.title}</h5>
                <p className="text-sm text-gray-600 mb-2">by {story.author}</p>
                <p className="text-sm text-gray-700 mb-3">{story.excerpt}</p>
                <Button size="sm" variant="outline">Read More</Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-3">
            <h4 className="font-medium">Support Groups</h4>
            {supportGroups.map((group, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{group.name}</h5>
                  <Badge variant={group.activity === 'Active' ? 'default' : 'secondary'}>
                    {group.activity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{group.members} members</span>
                  <span>Last post: {group.lastPost}</span>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Join Discussion
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunitySupport;
