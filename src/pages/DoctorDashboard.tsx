
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PatientOverviewCard from '@/components/doctor/PatientOverviewCard';
import AlertPanel from '@/components/doctor/AlertPanel';
import PatientDetailView from '@/components/doctor/PatientDetailView';
import { useDoctorAuth } from '@/contexts/DoctorAuthContext';
import { Search, Users, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';

type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

const DoctorDashboard: React.FC = () => {
  const { doctor, isAuthenticated } = useDoctorAuth();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with real API calls
  const [patients] = useState([
    {
      id: 'p1',
      name: 'Sarah Johnson',
      age: 28,
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      riskLevel: 'High' as RiskLevel,
      conditions: ['Severe Anxiety', 'Depression'],
      lastMoodScore: 2,
      lastEnergyScore: 2,
      lastStressScore: 5,
      trend: 'declining' as const,
    },
    {
      id: 'p2',
      name: 'Michael Chen',
      age: 34,
      lastUpdate: new Date(Date.now() - 5 * 60 * 60 * 1000),
      riskLevel: 'Medium' as RiskLevel,
      conditions: ['PTSD'],
      lastMoodScore: 3,
      lastEnergyScore: 3,
      lastStressScore: 4,
      trend: 'stable' as const,
    },
    {
      id: 'p3',
      name: 'Emily Rodriguez',
      age: 22,
      lastUpdate: new Date(Date.now() - 8 * 60 * 60 * 1000),
      riskLevel: 'Low' as RiskLevel,
      conditions: ['Mild Anxiety'],
      lastMoodScore: 4,
      lastEnergyScore: 4,
      lastStressScore: 2,
      trend: 'improving' as const,
    },
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: 'a1',
      patientName: 'Sarah Johnson',
      patientId: 'p1',
      condition: 'Severe Anxiety',
      severity: 'Critical' as const,
      suggestedAction: 'Emergency Referral',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
    },
    {
      id: 'a2',
      patientName: 'Michael Chen',
      patientId: 'p2',
      condition: 'PTSD Episode',
      severity: 'High' as const,
      suggestedAction: 'Reach Out',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
    },
  ]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Doctor Login Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Please log in to access the doctor dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedPatient) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <PatientDetailView
            patientId={selectedPatient}
            onBack={() => setSelectedPatient(null)}
          />
        </div>
      </div>
    );
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.conditions.some(condition => 
      condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleMarkAlertAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const handleTakeAction = (alert: any) => {
    console.log('Taking action for alert:', alert);
    // Implement action logic here
  };

  const handleContact = (patientId: string) => {
    console.log('Contacting patient:', patientId);
    // Implement contact logic here
  };

  const highRiskCount = patients.filter(p => p.riskLevel === 'High' || p.riskLevel === 'Critical').length;
  const unreadAlerts = alerts.filter(a => !a.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome back, {doctor?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              {doctor?.specialization}
            </Badge>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold">{highRiskCount}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold">{unreadAlerts}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Improving</p>
                <p className="text-2xl font-bold">
                  {patients.filter(p => p.trend === 'improving').length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Patient Overview</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {filteredPatients.map((patient) => (
                    <PatientOverviewCard
                      key={patient.id}
                      patient={patient}
                      onViewDetails={setSelectedPatient}
                      onContact={handleContact}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alert Panel */}
          <div className="space-y-6">
            <AlertPanel
              alerts={alerts}
              onMarkAsRead={handleMarkAlertAsRead}
              onTakeAction={handleTakeAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
