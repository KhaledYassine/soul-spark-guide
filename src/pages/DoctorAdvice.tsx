
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useHealth } from '@/contexts/HealthContext';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Stethoscope, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

const DoctorAdvice: React.FC = () => {
  const { user } = useAuth();
  const { healthData } = useHealth();
  const { chatSessions } = useChat();
  const navigate = useNavigate();
  
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');
  const [shareOptions, setShareOptions] = useState({
    moodLogs: false,
    healthRecords: false,
    chatLogs: false,
  });

  const handleShareOptionChange = (option: keyof typeof shareOptions) => {
    setShareOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleShareData = () => {
    if (!doctorEmail && !doctorPhone) {
      toast.error('Please provide doctor contact information');
      return;
    }

    if (!shareOptions.moodLogs && !shareOptions.healthRecords && !shareOptions.chatLogs) {
      toast.error('Please select at least one data type to share');
      return;
    }

    // Mock data sharing - in real app this would send to backend
    console.log('Sharing data with doctor:', {
      doctorEmail,
      doctorPhone,
      shareOptions,
      userData: user,
      healthData: shareOptions.healthRecords ? healthData : null,
      chatData: shareOptions.chatLogs ? chatSessions : null,
    });

    toast.success('Data shared successfully with your healthcare provider');
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
          <h1 className="text-2xl font-bold text-gray-900">Doctor Advice & Data Sharing</h1>
        </div>

        {/* Doctor Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-mental-purple">
              <Stethoscope className="h-5 w-5 mr-2" />
              Healthcare Provider Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor's Email
              </label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="doctor@example.com"
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor's Phone (Optional)
              </label>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={doctorPhone}
                  onChange={(e) => setDoctorPhone(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-mental-purple">
              <Share2 className="h-5 w-5 mr-2" />
              Select Data to Share
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="moodLogs"
                  checked={shareOptions.moodLogs}
                  onCheckedChange={() => handleShareOptionChange('moodLogs')}
                />
                <div>
                  <label htmlFor="moodLogs" className="text-sm font-medium">
                    Mood Logs & Status Check-ins
                  </label>
                  <p className="text-sm text-gray-600">
                    Share your daily energy, happiness, productivity, and stress ratings
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Current data: Energy {healthData.energy}/5, Happiness {healthData.happiness}/5, 
                    Productivity {healthData.productivity}/5, Stress {healthData.stress}/5
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="healthRecords"
                  checked={shareOptions.healthRecords}
                  onCheckedChange={() => handleShareOptionChange('healthRecords')}
                />
                <div>
                  <label htmlFor="healthRecords" className="text-sm font-medium">
                    Health Records & Metrics
                  </label>
                  <p className="text-sm text-gray-600">
                    Share your physical health data including heart rate and activity levels
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Current data: Heart Rate {healthData.heartRate} bpm, Steps {healthData.steps.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="chatLogs"
                  checked={shareOptions.chatLogs}
                  onCheckedChange={() => handleShareOptionChange('chatLogs')}
                />
                <div>
                  <label htmlFor="chatLogs" className="text-sm font-medium">
                    Mental Health Assistant Conversations
                  </label>
                  <p className="text-sm text-gray-600">
                    Share your conversations with the AI assistant for mental health insights
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    {chatSessions.length} conversation(s) available
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button
                onClick={handleShareData}
                className="bg-mental-purple hover:bg-mental-darkPurple text-white w-full"
              >
                Share Selected Data with Healthcare Provider
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Privacy & Security Notice</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your data will be securely transmitted to your healthcare provider. Only the selected 
              information will be shared. This feature is designed to help your doctor understand 
              your mental health patterns and provide better care. You can revoke access at any time 
              by contacting your healthcare provider directly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorAdvice;
