
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
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/context/AuthContext';

interface LoginOption {
  role: UserRole;
  title: string;
  icon: React.ReactNode;
  color: string;
}

const LoginForm: React.FC<{ defaultRole?: UserRole }> = ({ defaultRole = 'public' }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginOptions: LoginOption[] = [
    { role: 'fire', title: 'Fire Emergency', icon: <Flame className="w-6 h-6" />, color: 'bg-fire hover:bg-fire-dark' },
    { role: 'medical', title: 'Medical Emergency', icon: <Stethoscope className="w-6 h-6" />, color: 'bg-medical hover:bg-medical-dark' },
    { role: 'disaster', title: 'Natural Disaster', icon: <CloudLightning className="w-6 h-6" />, color: 'bg-disaster hover:bg-disaster-dark' },
    { role: 'accident', title: 'Road Accident', icon: <Car className="w-6 h-6" />, color: 'bg-accident hover:bg-accident-dark' },
    { role: 'public', title: 'Public User', icon: <User className="w-6 h-6" />, color: 'bg-primary hover:bg-primary/90' }
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

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">VillageSiren</h2>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {loginOptions.map((option) => (
          <Button
            key={option.role}
            type="button"
            onClick={() => setSelectedRole(option.role)}
            className={`flex items-center gap-2 ${option.color} ${
              selectedRole === option.role ? 'ring-2 ring-offset-2 ring-gray-500' : ''
            }`}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.title}</span>
          </Button>
        ))}
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
              placeholder="Username"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className={`w-full ${
              loginOptions.find(option => option.role === selectedRole)?.color || 'bg-primary'
            }`}
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
