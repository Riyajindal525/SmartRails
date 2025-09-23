import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Train, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginPageProps {
  onLogin: (role: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select a role.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = mode === 'login'
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: mode === 'login' ? "Login Failed" : "Registration Failed",
          description: data.msg || data.error || "Something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: mode === 'login' ? "Login Successful" : "Registration Successful",
          description: mode === 'login'
            ? `Welcome back, ${role}!`
            : "User registered successfully. You can now log in.",
        });
        if (mode === 'login') {
          onLogin(role);
        } else {
          setMode('login');
        }
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (roleValue: string) => {
    switch (roleValue) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'supervisor': return <Users className="h-4 w-4" />;
      case 'operator': return <Train className="h-4 w-4" />;
      default: return null;
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="min-h-screen bg-gradient-control flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-status opacity-30" />
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-border shadow-control">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <Train className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Railway Control System
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Secure access to train operations management
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="operator@railway.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border focus:ring-accent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border focus:ring-accent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className="bg-input border-border focus:ring-accent">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operator" className="flex items-center gap-2">
                    <Train className="h-4 w-4" /> Operator
                  </SelectItem>
                  <SelectItem value="supervisor" className="flex items-center gap-2">
                    <Users className="h-4 w-4" /> Supervisor
                  </SelectItem>
                  <SelectItem value="admin" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Administrator
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {mode === 'login' ? 'Authenticating...' : 'Registering...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {role && getRoleIcon(role)}
                  {mode === 'login' ? 'Access Control System' : 'Register Account'}
                </div>
              )}
            </Button>

            <div className="flex justify-between items-center text-center">
              <button
                type="button"
                className="text-sm text-accent hover:text-accent/80 transition-colors"
                onClick={toggleMode}
              >
                {mode === 'login'
                  ? "Don't have an account? Register"
                  : "Already registered? Login"}
              </button>
              {mode === 'login' && (
                <button
                  type="button"
                  className="text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
