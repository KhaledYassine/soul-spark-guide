
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, User, Heart, Brain } from 'lucide-react';

interface AssessmentData {
  // Personal Information
  name: string;
  age: string;
  gender: string;
  
  // Medical History
  hasSeenDoctor: string;
  currentConditions: string[];
  medications: string;
  
  // Mental Health Status
  currentMood: string;
  stressLevel: string;
  sleepQuality: string;
  supportSystem: string;
  
  // Goals
  primaryGoals: string[];
  additionalNotes: string;
}

const InitialAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    name: '',
    age: '',
    gender: '',
    hasSeenDoctor: '',
    currentConditions: [],
    medications: '',
    currentMood: '',
    stressLevel: '',
    sleepQuality: '',
    supportSystem: '',
    primaryGoals: [],
    additionalNotes: ''
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save assessment data and navigate to home
      console.log('Assessment completed:', assessmentData);
      navigate('/home');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (field: keyof AssessmentData, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleCondition = (condition: string) => {
    const conditions = assessmentData.currentConditions;
    if (conditions.includes(condition)) {
      updateData('currentConditions', conditions.filter(c => c !== condition));
    } else {
      updateData('currentConditions', [...conditions, condition]);
    }
  };

  const toggleGoal = (goal: string) => {
    const goals = assessmentData.primaryGoals;
    if (goals.includes(goal)) {
      updateData('primaryGoals', goals.filter(g => g !== goal));
    } else {
      updateData('primaryGoals', [...goals, goal]);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Medical History';
      case 3: return 'Current Mental Health';
      case 4: return 'Goals & Preferences';
      default: return 'Assessment';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1: return <User className="h-6 w-6" />;
      case 2: return <Heart className="h-6 w-6" />;
      case 3: return <Brain className="h-6 w-6" />;
      case 4: return <Brain className="h-6 w-6" />;
      default: return <User className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Soul Spark</h1>
          <p className="text-gray-600">Let's get to know you better to personalize your experience</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        <Card className="mental-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              {getStepIcon()}
              <span className="ml-2">{getStepTitle()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={assessmentData.name}
                    onChange={(e) => updateData('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={assessmentData.age}
                      onChange={(e) => updateData('age', e.target.value)}
                      placeholder="Age"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={assessmentData.gender} onValueChange={(value) => updateData('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Medical History */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Have you seen a doctor for mental health concerns?</Label>
                  <RadioGroup value={assessmentData.hasSeenDoctor} onValueChange={(value) => updateData('hasSeenDoctor', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="doctor-yes" />
                      <Label htmlFor="doctor-yes">Yes, recently</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="past" id="doctor-past" />
                      <Label htmlFor="doctor-past">Yes, in the past</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="doctor-no" />
                      <Label htmlFor="doctor-no">No, never</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Do you have any of these conditions? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Anxiety', 'Depression', 'PTSD', 'Bipolar Disorder', 'ADHD', 'OCD', 'Eating Disorder', 'Other'].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          checked={assessmentData.currentConditions.includes(condition)}
                          onCheckedChange={() => toggleCondition(condition)}
                        />
                        <Label className="text-sm">{condition}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Current medications (if any)</Label>
                  <Textarea
                    id="medications"
                    value={assessmentData.medications}
                    onChange={(e) => updateData('medications', e.target.value)}
                    placeholder="List any medications you're currently taking..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Current Mental Health */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>How would you describe your current mood?</Label>
                  <RadioGroup value={assessmentData.currentMood} onValueChange={(value) => updateData('currentMood', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excellent" id="mood-excellent" />
                      <Label htmlFor="mood-excellent">😊 Excellent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="mood-good" />
                      <Label htmlFor="mood-good">🙂 Good</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fair" id="mood-fair" />
                      <Label htmlFor="mood-fair">😐 Fair</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="mood-poor" />
                      <Label htmlFor="mood-poor">😕 Poor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-poor" id="mood-very-poor" />
                      <Label htmlFor="mood-very-poor">😢 Very Poor</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Current stress level</Label>
                  <Select value={assessmentData.stressLevel} onValueChange={(value) => updateData('stressLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stress level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very-low">Very Low</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="very-high">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sleep quality</Label>
                  <Select value={assessmentData.sleepQuality} onValueChange={(value) => updateData('sleepQuality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sleep quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="very-poor">Very Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support">Who do you turn to for support?</Label>
                  <Input
                    id="support"
                    value={assessmentData.supportSystem}
                    onChange={(e) => updateData('supportSystem', e.target.value)}
                    placeholder="e.g., Family, friends, therapist, support groups..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Goals & Preferences */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>What are your primary goals? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      'Reduce anxiety and stress',
                      'Improve mood and happiness',
                      'Better sleep quality',
                      'Increase energy levels',
                      'Build healthy habits',
                      'Improve relationships',
                      'Manage work-life balance',
                      'Develop coping strategies'
                    ].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          checked={assessmentData.primaryGoals.includes(goal)}
                          onCheckedChange={() => toggleGoal(goal)}
                        />
                        <Label className="text-sm">{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional notes or concerns</Label>
                  <Textarea
                    id="notes"
                    value={assessmentData.additionalNotes}
                    onChange={(e) => updateData('additionalNotes', e.target.value)}
                    placeholder="Anything else you'd like us to know about your mental health journey..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                style={{ backgroundColor: '#93932A' }}
                className="text-white"
              >
                {currentStep === totalSteps ? 'Complete Assessment' : 'Next'}
                {currentStep !== totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InitialAssessment;
