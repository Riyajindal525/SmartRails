import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Train,
  LayoutDashboard,
  Route,
  AlertTriangle,
  BarChart3,
  Settings,
  Bell,
  History,
  Users,
  LogOut,
  Zap,
  Map
} from 'lucide-react';

interface SidebarProps {
  userRole: string;
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['operator', 'supervisor', 'admin']
  },
  {
    id: 'trains',
    label: 'Train Details',
    icon: Train,
    roles: ['operator', 'supervisor', 'admin']
  },
  {
    id: 'scheduling',
    label: 'AI Scheduling',
    icon: Zap,
    roles: ['operator', 'supervisor', 'admin']
  },
  {
    id: 'conflicts',
    label: 'Conflict Resolution',
    icon: AlertTriangle,
    roles: ['operator', 'supervisor', 'admin'],
    badge: '2'
  },
  {
    id: 'simulation',
    label: 'What-If Simulation',
    icon: Map,
    roles: ['operator', 'supervisor', 'admin']
  },
  {
    id: 'analytics',
    label: 'Predictive Analytics',
    icon: BarChart3,
    roles: ['supervisor', 'admin']
  },
  {
    id: 'incidents',
    label: 'Incident Management',
    icon: AlertTriangle,
    roles: ['operator', 'supervisor', 'admin']
  },
  {
    id: 'history',
    label: 'Historical Replay',
    icon: History,
    roles: ['supervisor', 'admin']
  },
  {
    id: 'reports',
    label: 'Reports & Logs',
    icon: BarChart3,
    roles: ['supervisor', 'admin']
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    roles: ['admin']
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    roles: ['admin']
  }
];

const Sidebar: React.FC<SidebarProps> = ({ userRole, activeView, onViewChange, onLogout }) => {
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-destructive';
      case 'supervisor': return 'text-warning';
      case 'operator': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'supervisor': return 'bg-warning text-warning-foreground';
      case 'operator': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col shadow-panel">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <Train className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">Railway Control</h2>
            <p className="text-sm text-muted-foreground">Operations Center</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">Control Officer</div>
            <Badge className={`text-xs ${getRoleBadge(userRole)}`}>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-glow' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              } transition-all duration-200`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge className="bg-destructive text-destructive-foreground text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Notifications */}
      <div className="p-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3 border-border hover:bg-muted/50"
        >
          <Bell className="h-4 w-4" />
          <span className="flex-1 text-left">Notifications</span>
          <Badge className="bg-destructive text-destructive-foreground">3</Badge>
        </Button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3 border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;