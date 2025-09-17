import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "@/components/login/LoginPage";
import MainLayout from "@/components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ role: string } | null>(null);

  const handleLogin = (role: string) => {
    setUser({ role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                user ? (
                  <MainLayout userRole={user.role} onLogout={handleLogout} />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="*" 
              element={
                user ? (
                  <MainLayout userRole={user.role} onLogout={handleLogout} />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
