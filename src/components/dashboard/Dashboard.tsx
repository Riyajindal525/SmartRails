import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Train, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Activity, 
  Bell,
  Filter,
  RefreshCw
} from 'lucide-react';

interface DashboardProps {
  userRole: string;
}

interface TrainStatus {
  id: string;
  name: string;
  status: 'on-time' | 'delayed' | 'emergency';
  location: string;
  nextStation: string;
  eta: string;
  delay?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const [trains, setTrains] = useState<TrainStatus[]>([
    {
      id: 'T001',
      name: 'Express Mumbai-Delhi',
      status: 'on-time',
      location: 'Approaching Bhopal Junction',
      nextStation: 'Bhopal Junction',
      eta: '14:25'
    },
    {
      id: 'T002', 
      name: 'Rajdhani Express',
      status: 'delayed',
      location: 'Agra Cantt',
      nextStation: 'Mathura Junction',
      eta: '15:40',
      delay: 15
    },
    {
      id: 'T003',
      name: 'Shatabdi Express',
      status: 'emergency',
      location: 'Gwalior Junction',
      nextStation: 'Jhansi Junction',
      eta: '16:15'
    },
    {
      id: 'T004',
      name: 'Duronto Express',
      status: 'on-time',
      location: 'Kanpur Central',
      nextStation: 'Lucknow Junction',
      eta: '17:30'
    }
  ]);

  const [stats, setStats] = useState({
    totalTrains: 24,
    onTime: 18,
    delayed: 5,
    emergency: 1,
    conflicts: 2
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-success text-success-foreground';
      case 'delayed': return 'bg-warning text-warning-foreground';
      case 'emergency': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <Activity className="h-4 w-4" />;
      case 'delayed': return <Clock className="h-4 w-4" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
      default: return <Train className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalTrains: prev.totalTrains + Math.floor(Math.random() * 3) - 1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Control Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time railway operations monitoring • {userRole}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="border-border">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="border-border">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="border-border">
            <Bell className="h-4 w-4" />
            <Badge className="ml-2 bg-destructive text-destructive-foreground">3</Badge>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-card border-border shadow-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Trains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalTrains}</div>
            <div className="flex items-center text-sm text-success">
              <Activity className="h-4 w-4 mr-1" />
              Active
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              On Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.onTime}</div>
            <div className="text-sm text-muted-foreground">
              {Math.round((stats.onTime / stats.totalTrains) * 100)}% performance
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Delayed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.delayed}</div>
            <div className="text-sm text-muted-foreground">Avg 12 min</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Emergency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.emergency}</div>
            <div className="text-sm text-muted-foreground">Require attention</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conflicts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.conflicts}</div>
            <div className="text-sm text-muted-foreground">Active issues</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Train Status */}
        <Card className="lg:col-span-2 bg-card border-border shadow-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="h-5 w-5 text-primary" />
              Live Train Status
            </CardTitle>
            <CardDescription>Real-time monitoring of active trains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trains.map((train) => (
                <div 
                  key={train.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(train.status)}
                      <div>
                        <div className="font-semibold text-foreground">{train.name}</div>
                        <div className="text-sm text-muted-foreground">{train.id}</div>
                      </div>
                    </div>
                    <div>
                      <Badge className={getStatusColor(train.status)}>
                        {train.status.replace('-', ' ').toUpperCase()}
                        {train.delay && ` (+${train.delay}m)`}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {train.location}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      Next: {train.nextStation} • {train.eta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-card border-border shadow-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Recent Alerts
            </CardTitle>
            <CardDescription>System notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2 text-destructive font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Signal Failure
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Track 3 signal malfunction at Gwalior Junction
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  2 minutes ago
                </div>
              </div>

              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center gap-2 text-warning font-medium">
                  <Clock className="h-4 w-4" />
                  Delay Alert
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Rajdhani Express running 15 minutes behind schedule
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  5 minutes ago
                </div>
              </div>

              <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Activity className="h-4 w-4" />
                  System Update
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  AI scheduling optimization completed
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  10 minutes ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;