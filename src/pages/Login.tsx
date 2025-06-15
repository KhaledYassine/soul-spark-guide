
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Wallet, Shield, Heart, Brain, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const { connect } = useAuth();
  const navigate = useNavigate();
  
  const handleConnect = () => {
    connect();
    navigate('/initial-assessment');
  };

  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure with blockchain technology"
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "AI-powered insights tailored to your wellness journey"
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Track mood, stress, and build healthy habits"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-mental-purple animate-pulse" />
              <div className="absolute inset-0 bg-mental-purple/20 rounded-full blur-xl"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-mental-purple to-mental-darkPurple bg-clip-text text-transparent">
            Soul Spark
          </h1>
          <p className="text-xl text-gray-600 mb-2">Your AI-Powered Mental Wellness Companion</p>
          <p className="text-gray-500">Transform your mental health journey with personalized insights and support</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Soul Spark?</h2>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex-shrink-0">
                      <feature.icon className="h-8 w-8 text-mental-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="animate-fade-in">
            <Card className="mental-card shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <Wallet className="h-6 w-6 mr-2 text-mental-purple" />
                  Connect Your Wallet
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Secure, private, and decentralized mental health tracking
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-mental-lightGray rounded-lg">
                    <Shield className="h-5 w-5 text-mental-purple mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">HashPack Wallet</p>
                      <p className="text-xs text-gray-600">Hedera Hashgraph Network</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleConnect}
                    className="w-full text-white py-3 h-12 text-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
                    style={{ backgroundColor: '#93932A' }}
                  >
                    <Wallet className="h-5 w-5 mr-2" />
                    Connect HashPack Wallet
                  </Button>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                    <Shield className="h-4 w-4" />
                    <span>End-to-end encrypted • HIPAA compliant • Web3 secured</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-mental-purple">10K+</div>
                <div className="text-xs text-gray-600">Active Users</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-mental-purple">95%</div>
                <div className="text-xs text-gray-600">Satisfaction</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-mental-purple">24/7</div>
                <div className="text-xs text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
