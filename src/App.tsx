
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { HealthProvider } from "@/contexts/HealthContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { DatabaseProvider } from "@/contexts/DatabaseContext";
import { DoctorAuthProvider } from "@/contexts/DoctorAuthContext";
import { UserModeProvider } from "@/contexts/UserModeContext";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import Login from "./pages/Login";
import Assessment from "./pages/Assessment";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import DoctorAdvice from "./pages/DoctorAdvice";
import Settings from "./pages/Settings";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DatabaseProvider>
        <NotificationProvider>
          <AuthProvider>
            <DoctorAuthProvider>
              <UserModeProvider>
                <HealthProvider>
                  <ChatProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <div className="min-h-screen">
                        <Routes>
                          <Route path="/" element={<Navigate to="/login" />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/assessment" element={<Assessment />} />
                          <Route path="/home" element={<Home />} />
                          <Route path="/chat" element={<Chat />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/doctor-advice" element={<DoctorAdvice />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/doctor-login" element={<DoctorLogin />} />
                          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                        <EnhancedNavigation />
                      </div>
                    </BrowserRouter>
                  </ChatProvider>
                </HealthProvider>
              </UserModeProvider>
            </DoctorAuthProvider>
          </AuthProvider>
        </NotificationProvider>
      </DatabaseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
