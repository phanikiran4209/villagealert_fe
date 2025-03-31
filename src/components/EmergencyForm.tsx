
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAlerts, AlertLocation } from '@/context/AlertContext';
import { Flame, Stethoscope, CloudLightning, Car } from 'lucide-react';

const EmergencyForm: React.FC = () => {
  const { toast } = useToast();
  const { addAlert } = useAlerts();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState<'fire' | 'medical' | 'disaster' | 'accident'>('fire');
  const [location, setLocation] = useState<AlertLocation>({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
          toast({
            title: "Location detected",
            description: "Your current location has been captured.",
          });
        },
        (error) => {
          console.error("Error getting location", error);
          setIsLoading(false);
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, we would upload the image to storage and get a URL
    // For this demo, we'll use the image preview as the URL
    const alertData = {
      type: selectedType,
      title,
      description,
      location: {
        ...location,
        address,
      },
      imageUrl: imagePreview || undefined,
      reportedBy: "Anonymous User", // In a real app, this would be the user's name or ID
    };
    
    // Add the alert to the context
    addAlert(alertData);
    
    // Reset form
    setTitle('');
    setDescription('');
    setAddress('');
    setImage(null);
    setImagePreview(null);
    
    toast({
      title: "Emergency reported",
      description: "Your emergency has been reported to the authorities.",
    });
    
    setIsLoading(false);
  };

  const emergencyTypes = [
    { type: 'fire' as const, label: 'Fire Emergency', icon: <Flame />, color: 'bg-fire text-white' },
    { type: 'medical' as const, label: 'Medical Emergency', icon: <Stethoscope />, color: 'bg-medical text-white' },
    { type: 'disaster' as const, label: 'Natural Disaster', icon: <CloudLightning />, color: 'bg-disaster text-white' },
    { type: 'accident' as const, label: 'Road Accident', icon: <Car />, color: 'bg-accident text-white' },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Report an Emergency</CardTitle>
        <CardDescription>
          Please provide details about the emergency situation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergency-type">Emergency Type</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-4">
                {emergencyTypes.map((type) => (
                  <Button
                    key={type.type}
                    type="button"
                    className={`flex items-center justify-center gap-2 ${
                      selectedType === type.type ? type.color : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => setSelectedType(type.type)}
                  >
                    {type.icon}
                    <span className="hidden sm:inline">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="title">Emergency Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief title of the emergency"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the emergency situation in detail"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter the address or location details"
                  className="flex-1"
                  required
                />
                <Button 
                  type="button" 
                  onClick={getCurrentLocation}
                  variant="outline"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Get Location"}
                </Button>
              </div>
              {location.latitude !== 0 && location.longitude !== 0 && (
                <p className="mt-1 text-sm text-gray-500">
                  Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="image">Upload Image (Optional)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Emergency preview"
                    className="object-cover w-full h-48 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          className={`${
            selectedType === 'fire' ? 'bg-fire hover:bg-fire-dark' :
            selectedType === 'medical' ? 'bg-medical hover:bg-medical-dark' :
            selectedType === 'disaster' ? 'bg-disaster hover:bg-disaster-dark' :
            'bg-accident hover:bg-accident-dark'
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Report Emergency"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmergencyForm;
