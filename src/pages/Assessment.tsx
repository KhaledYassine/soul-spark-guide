
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Smile, Frown, Meh, User, Calendar, Heart } from 'lucide-react';

const Assessment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: '',
    age: '',
    mentalState: '',
    hasSeenDoctor: ''
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save assessment data (you can later integrate with your backend)
      localStorage.setItem('userAssessment', JSON.stringify(formData));
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.nickname.trim() !== '';
      case 2: return formData.age !== '' && parseInt(formData.age) > 0;
      case 3: return formData.mentalState !== '';
      case 4: return formData.hasSeenDoctor !== '';
      default: return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <User className="h-12 w-12 text-mental-purple mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">What should we call you?</h2>
                <p className="text-gray-600">Choose a nickname that makes you feel comfortable</p>
              </div>
              <Input
                value={formData.nickname}
                onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                placeholder="Enter your nickname"
                className="mental-input text-center text-lg"
                maxLength={20}
              />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Calendar className="h-12 w-12 text-mental-purple mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">How old are you?</h2>
                <p className="text-gray-600">This helps us personalize your experience</p>
              </div>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                placeholder="Enter your age"
                className="mental-input text-center text-lg"
                min="13"
                max="120"
              />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Heart className="h-12 w-12 text-mental-purple mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">How are you feeling lately?</h2>
                <p className="text-gray-600">Be honest - there's no wrong answer</p>
              </div>
              <RadioGroup
                value={formData.mentalState}
                onValueChange={(value) => setFormData({...formData, mentalState: value})}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="great" id="great" />
                  <Label htmlFor="great" className="flex items-center space-x-2 cursor-pointer">
                    <Smile className="h-5 w-5 text-green-500" />
                    <span>I'm feeling great!</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="okay" id="okay" />
                  <Label htmlFor="okay" className="flex items-center space-x-2 cursor-pointer">
                    <Meh className="h-5 w-5 text-yellow-500" />
                    <span>I'm doing okay</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="struggling" id="struggling" />
                  <Label htmlFor="struggling" className="flex items-center space-x-2 cursor-pointer">
                    <Frown className="h-5 w-5 text-orange-500" />
                    <span>I'm struggling a bit</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="difficult" id="difficult" />
                  <Label htmlFor="difficult" className="flex items-center space-x-2 cursor-pointer">
                    <Frown className="h-5 w-5 text-red-500" />
                    <span>Things are quite difficult</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Heart className="h-12 w-12 text-mental-purple mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Professional Support</h2>
                <p className="text-gray-600">Have you spoken with a mental health professional recently?</p>
              </div>
              <RadioGroup
                value={formData.hasSeenDoctor}
                onValueChange={(value) => setFormData({...formData, hasSeenDoctor: value})}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="yes-recent" id="yes-recent" />
                  <Label htmlFor="yes-recent" className="cursor-pointer">
                    Yes, within the last 6 months
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="yes-past" id="yes-past" />
                  <Label htmlFor="yes-past" className="cursor-pointer">
                    Yes, but more than 6 months ago
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="cursor-pointer">
                    No, I haven't
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="prefer-not-say" id="prefer-not-say" />
                  <Label htmlFor="prefer-not-say" className="cursor-pointer">
                    I prefer not to say
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-mental-lightGray to-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Soul Spark</h1>
        <div className="text-sm bg-white px-3 py-1 rounded-full text-mental-purple font-medium">
          {step} of 4
        </div>
      </header>
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-mental-purple h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="animate-fade-in">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 space-x-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 bg-mental-purple hover:bg-mental-darkPurple text-white"
            >
              {step === 4 ? 'Complete' : 'Next'}
            </Button>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 mt-6 text-center">
            Your information is private and secure. We use this to personalize your wellness journey.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
