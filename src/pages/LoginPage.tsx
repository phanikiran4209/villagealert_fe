import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
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

interface Credentials {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { login, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>('public');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Predefined credentials for each role
  const credentialsMap: Record<UserRole, Credentials> = {
    fire: { username: 'fireadmin', password: 'password' },
    medical: { username: 'medicaladmin', password: 'password' },
    disaster: { username: 'disasteradmin', password: 'password' },
    accident: { username: 'accidentadmin', password: 'password' },
    public: { username: 'phani', password: 'password' },
  };

  // Redirect authenticated users
  if (isAuthenticated) {
    if (userRole === 'public') {
      return <Navigate to="/public" replace />;
    } else {
      return <Navigate to={`/dashboard/${userRole}`} replace />;
    }
  }

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

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

    // Check if username and password are provided
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Username and password are required",
        variant: "destructive",
      });
      return;
    }

    // Get the expected credentials for the selected role
    const expectedCredentials = credentialsMap[selectedRole];

    // Validate the entered credentials
    if (
      username !== expectedCredentials.username ||
      password !== expectedCredentials.password
    ) {
      toast({
        title: "Error",
        description: "Invalid username or password",
        variant: "destructive",
      });
      return;
    }

    // If credentials are correct, proceed with login
    login(selectedRole);
    
    toast({
      title: "Success",
      description: `Logged in as ${selectedRole} responder`,
    });

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-full h-full">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/20 rounded-full filter blur-3xl animate-pulse delay-3000"></div>
      </div>
      
      <div className="text-center mb-8 absolute top-8 z-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-2 animate-pulse">
          VillageSiren
        </h1>
        <p className="text-gray-300 text-lg animate-fade-in">Emergency Response System</p>
        <Button 
          variant="link" 
          onClick={() => navigate('/')} 
          className="mt-2 text-purple-400 hover:text-purple-300 animate-bounce"
        >
          Back to Home
        </Button>
      </div>

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

      {/* Decorative elements */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-sm font-medium">
        Protecting communities together • Fast • Reliable • Secure
      </div>

      {/* Emergency service icons */}
      <div className="absolute left-10 top-1/3 transform -translate-y-1/2 hidden lg:flex flex-col gap-6">
        <div className="p-3 rounded-full bg-gradient-to-r from-fire to-fire-dark shadow-lg shadow-fire/30 animate-pulse delay-100">
          <Flame className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-medical to-medical-dark shadow-lg shadow-medical/30 animate-pulse delay-300">
          <Stethoscope className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-disaster to-disaster-dark shadow-lg shadow-disaster/30 animate-pulse delay-500">
          <CloudLightning className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-accident to-accident-dark shadow-lg shadow-accident/30 animate-pulse delay-700">
          <Car className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="absolute right-10 top-1/3 transform -translate-y-1/2 hidden lg:flex flex-col gap-6">
        <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg shadow-purple/30 animate-pulse delay-200">
          <User className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg shadow-blue/30 animate-pulse delay-400">
          <User className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-700 shadow-lg shadow-pink/30 animate-pulse delay-600">
          <User className="h-6 w-6 text-white" />
        </div>
        <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 shadow-lg shadow-amber/30 animate-pulse delay-800">
          <User className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;