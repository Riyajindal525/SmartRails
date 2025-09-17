import React, { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface MainLayoutProps {
  userRole: string;
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ userRole, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      default:
        return (
          <div className="p-6 space-y-6 bg-background min-h-screen">
            <div className="flex items-center justify-center min-h-[60vh]">
              <Card className="w-full max-w-md bg-card border-border shadow-panel">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Construction className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {activeView.charAt(0).toUpperCase() + activeView.slice(1).replace(/([A-Z])/g, ' $1')}
                  </CardTitle>
                  <CardDescription>
                    This module is under development and will be available soon.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Core railway control features are being implemented to provide comprehensive train operations management.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userRole={userRole}
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainLayout;