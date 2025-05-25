
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Assessment: React.FC = () => {
  const { updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [mentalState, setMentalState] = useState('');
  const [hasSeenDoctor, setHasSeenDoctor] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUserProfile({
      nickname,
      age: parseInt(age),
      mentalState,
      hasSeenDoctor: hasSeenDoctor || false,
    });
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mental-lightGray to-white p-6">
      <div className="max-w-md mx-auto">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-center text-mental-purple">Let's Get to Know You</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What should we call you?
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mental-purple focus:border-transparent"
                  placeholder="Enter your nickname"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mental-purple focus:border-transparent"
                  placeholder="Enter your age"
                  min="13"
                  max="120"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you describe your current mental state?
                </label>
                <select
                  value={mentalState}
                  onChange={(e) => setMentalState(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mental-purple focus:border-transparent"
                  required
                >
                  <option value="">Select your state</option>
                  <option value="great">Great - I'm feeling really good</option>
                  <option value="good">Good - Things are going well</option>
                  <option value="okay">Okay - Just getting by</option>
                  <option value="struggling">Struggling - Having a tough time</option>
                  <option value="difficult">Very Difficult - Need support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have you seen a mental health professional recently?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasSeenDoctor"
                      value="yes"
                      onChange={() => setHasSeenDoctor(true)}
                      className="mr-2 text-mental-purple"
                    />
                    Yes, I have
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasSeenDoctor"
                      value="no"
                      onChange={() => setHasSeenDoctor(false)}
                      className="mr-2 text-mental-purple"
                    />
                    No, I haven't
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-mental-purple hover:bg-mental-darkPurple text-white py-3"
              >
                Continue to App
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
