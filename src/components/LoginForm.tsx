
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Flame, 
  Stethoscope, 
  CloudLightning, 
  Car,
  User,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/context/AuthContext';

interface LoginOption {
  role: UserRole;
  title: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  glowColor: string;
}

const LoginForm: React.FC<{ defaultRole?: UserRole }> = ({ defaultRole = 'public' }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const loginOptions: LoginOption[] = [
    { 
      role: 'fire', 
      title: 'Fire Emergency', 
      icon: <Flame className="w-6 h-6" />, 
      color: 'bg-gradient-to-r from-red-500 to-red-600', 
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      glowColor: 'shadow-lg shadow-red-500/50'
    },
    { 
      role: 'medical', 
      title: 'Medical Emergency', 
      icon: <Stethoscope className="w-6 h-6" />, 
      color: 'bg-gradient-to-r from-green-500 to-green-600', 
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      glowColor: 'shadow-lg shadow-green-500/50' 
    },
    { 
      role: 'disaster', 
      title: 'Natural Disaster', 
      icon: <CloudLightning className="w-6 h-6" />, 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600', 
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      glowColor: 'shadow-lg shadow-blue-500/50' 
    },
    { 
      role: 'accident', 
      title: 'Road Accident', 
      icon: <Car className="w-6 h-6" />, 
      color: 'bg-gradient-to-r from-amber-500 to-amber-600', 
      hoverColor: 'hover:from-amber-600 hover:to-amber-700',
      glowColor: 'shadow-lg shadow-amber-500/50' 
    },
    { 
      role: 'public', 
      title: 'Public User', 
      icon: <User className="w-6 h-6" />, 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600', 
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      glowColor: 'shadow-lg shadow-purple-500/50' 
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Username and password are required",
        variant: "destructive",
      });
      return;
    }

    // Here we would normally authenticate with a backend
    // For this demo, we'll just log in with the selected role
    login(selectedRole);
    
    toast({
      title: "Success",
      description: `Logged in as ${selectedRole} responder`,
    });

    // Navigate based on role
    if (selectedRole === 'public') {
      navigate('/public');
    } else {
      navigate(`/dashboard/${selectedRole}`);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Please consult your system administrator for password reset.",
      variant: "destructive",
    });
    setShowForgotPassword(false);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-black/40 backdrop-blur-xl rounded-lg border border-white/10 shadow-2xl relative z-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          VillageSiren
        </h2>
        <p className="mt-2 text-gray-300">Sign in to your account</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {loginOptions.map((option) => (
          <Button
            key={option.role}
            type="button"
            onClick={() => setSelectedRole(option.role)}
            className={`flex items-center gap-2 ${option.color} ${option.hoverColor} ${
              selectedRole === option.role ? `${option.glowColor} scale-105` : ''
            } transition-all duration-300 transform`}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.title}</span>
          </Button>
        ))}
      </div>

      {showForgotPassword ? (
        <div className="mt-8 space-y-6">
          <p className="text-gray-300 text-center">
            Please confirm that you want to reset your password. You will need to contact your system administrator.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => setShowForgotPassword(false)}
              className="w-full bg-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleForgotPassword}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30"
            >
              Confirm
            </Button>
          </div>
        </div>
      ) : (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-offset-0 focus:ring-offset-black focus:ring-opacity-50"
                placeholder="Username"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <HelpCircle className="w-3 h-3" /> Forgot Password?
                </button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-offset-0 focus:ring-offset-black focus:ring-opacity-50"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className={`w-full transition-all duration-300 ${
                loginOptions.find(option => option.role === selectedRole)?.color || 'bg-primary'
              } ${
                loginOptions.find(option => option.role === selectedRole)?.hoverColor || 'hover:bg-primary/90'
              } ${
                loginOptions.find(option => option.role === selectedRole)?.glowColor || ''
              }`}
            >
              Sign in
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
