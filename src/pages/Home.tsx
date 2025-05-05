
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StatusSlider from '@/components/StatusSlider';
import HealthStat from '@/components/HealthStat';
import { useHealth } from '@/contexts/HealthContext';
import { useNavigate } from 'react-router-dom';
import { Smile, Frown, MessageSquare } from 'lucide-react';

const Home: React.FC = () => {
  const { statusRatings, healthStats, updateRating, refreshHealthStats } = useHealth();
  const navigate = useNavigate();
  
  useEffect(() => {
    refreshHealthStats();
  }, [refreshHealthStats]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-mental-lightGray to-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Soul Spark</h1>
        <div className="text-sm bg-white px-3 py-1 rounded-full text-mental-purple font-medium">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      </header>
      
      <main className="flex-1 px-4 pb-24 space-y-6">
        {/* Health Stats */}
        <section className="animate-fade-in">
          <h2 className="text-lg font-semibold mb-3">Health Insights</h2>
          <div className="grid grid-cols-2 gap-3">
            <HealthStat type="heartRate" value={healthStats.heartRate} />
            <HealthStat type="steps" value={healthStats.steps} />
          </div>
        </section>
        
        {/* Status Check-in */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Status Check-in</h2>
                <div className="flex space-x-1">
                  <Smile className="h-5 w-5 text-green-500" />
                  <Frown className="h-5 w-5 text-red-500" />
                </div>
              </div>
              
              <div className="space-y-4">
                <StatusSlider 
                  label="Energy" 
                  value={statusRatings.energy} 
                  onChange={(value) => updateRating('energy', value)} 
                />
                <StatusSlider 
                  label="Happiness" 
                  value={statusRatings.happiness} 
                  onChange={(value) => updateRating('happiness', value)} 
                />
                <StatusSlider 
                  label="Productivity" 
                  value={statusRatings.productivity} 
                  onChange={(value) => updateRating('productivity', value)} 
                />
                <StatusSlider 
                  label="Stress" 
                  value={statusRatings.stress} 
                  onChange={(value) => updateRating('stress', value)} 
                />
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Chat Assistant Shortcut */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button 
            onClick={() => navigate('/chat')}
            className="w-full bg-mental-purple hover:bg-mental-darkPurple text-white py-6 flex items-center justify-center space-x-2"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Talk to Your Assistant</span>
          </Button>
        </section>
      </main>
      
      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <nav className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center py-1 text-mental-purple">
            <span>Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-1 text-gray-500" onClick={() => navigate('/chat')}>
            <span>Chat</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-1 text-gray-500">
            <span>Profile</span>
          </Button>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
