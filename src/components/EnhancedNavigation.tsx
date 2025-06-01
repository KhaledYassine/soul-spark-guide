
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare, BarChart3, Stethoscope, User, Menu, X } from 'lucide-react';

const EnhancedNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/doctor-advice', icon: Stethoscope, label: 'Doctor' },
    { path: '/assessment', icon: User, label: 'Profile' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Toggle Button - Always visible */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-white shadow-lg border-2"
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Top Navigation Bar */}
      <div className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-40 transition-transform duration-300 ${
        isVisible && isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex justify-center items-center p-2 max-w-4xl mx-auto">
          <div className="flex space-x-1">
            {tabs.map(({ path, icon: Icon, label }) => (
              <Button
                key={path}
                variant={isActive(path) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  navigate(path);
                  setIsMenuOpen(false);
                }}
                className="flex flex-col items-center p-2 h-auto"
              >
                <Icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Original) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 shadow-lg z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map(({ path, icon: Icon, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive(path)
                  ? 'text-mental-purple bg-mental-purple/10'
                  : 'text-gray-600 hover:text-mental-purple'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default EnhancedNavigation;
