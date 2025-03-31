import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Gemini API configuration
  const base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const api_key = "AIzaSyDBHhl-ETSPrC3mIVe7juE7oaTW6MMVy4o"; // Your Gemini API key

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
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gemini API call to analyze emergency consistency
  const analyzeEmergency = async (type: string, title: string, imageName: string) => {
    try {
      const response = await fetch(`${base_url}?key=${api_key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an AI that analyzes emergency reports. Analyze if the emergency type, title, and image name are consistent with each other. Return a JSON object with "consistent" (boolean) and "message" (string) fields explaining your reasoning.

Emergency Type: ${type}
Emergency Title: ${title}
Image Name: ${imageName}

Are these consistent? Respond in JSON format with a simple message that can be shown to the user. If not consistent, suggest how to improve the report.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Gemini API Response:', data);

      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini API');
      }

      const resultText = data.candidates[0].content.parts[0].text;
      // Clean up the response (remove any markdown or extra formatting)
      const cleanedResult = resultText.replace(/```json\n|\n```/g, '').trim();
      const result = JSON.parse(cleanedResult);

      if (typeof result.consistent !== 'boolean' || typeof result.message !== 'string') {
        throw new Error('Invalid JSON structure in API response');
      }

      return result;
    } catch (error) {
      console.error('Error analyzing emergency with Gemini API:', error);
      return { 
        consistent: false, 
        message: 'Please ensure all information is accurate and matches the emergency type.' 
      };
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !address || !image) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including an image.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setIsAnalyzing(true);

    try {
      const imageName = image.name || "emergency_image.jpg";
      
      // Show analyzing message
      toast({
        title: "Analyzing Report",
        description: "AI is verifying your emergency information for accuracy...",
        duration: 3000,
      });

      // Analyze consistency using Gemini API
      const analysisResult = await analyzeEmergency(selectedType, title, imageName);

      if (!analysisResult.consistent) {
        toast({
          title: "Please Verify Information",
          description: analysisResult.message || "The information doesn't seem consistent. Please check and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        setIsAnalyzing(false);
        return;
      }

      // If consistent, proceed with submission
      const alertData = {
        type: selectedType,
        title,
        description,
        location: {
          ...location,
          address,
        },
        imageUrl: imagePreview,
        reportedBy: "Anonymous User",
      };

      addAlert(alertData);

      // Reset form
      setTitle('');
      setDescription('');
      setAddress('');
      setImage(null);
      setImagePreview(null);

      toast({
        title: "Emergency Reported Successfully",
        description: "Your alert has been verified and sent to the authorities. Help is on the way!",
      });
    } catch (error) {
      console.error("Error submitting emergency:", error);
      toast({
        title: "Submission Error",
        description: "Please verify all information and try again. Ensure details match the emergency type.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  const emergencyTypes = [
    { type: 'fire' as const, label: 'Fire Emergency', icon: <Flame />, color: 'bg-red-500 text-white' },
    { type: 'medical' as const, label: 'Medical Emergency', icon: <Stethoscope />, color: 'bg-green-500 text-white' },
    { type: 'disaster' as const, label: 'Natural Disaster', icon: <CloudLightning />, color: 'bg-blue-500 text-white' },
    { type: 'accident' as const, label: 'Road Accident', icon: <Car />, color: 'bg-yellow-500 text-white' },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Report an Emergency</CardTitle>
        <CardDescription>
          Please provide accurate details about the emergency situation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergency-type">Emergency Type *</Label>
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
              <Label htmlFor="title">Emergency Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief title of the emergency"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
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
              <Label htmlFor="location">Location *</Label>
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
              <Label htmlFor="image">Upload Image *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
                required
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
            selectedType === 'fire' ? 'bg-red-500 hover:bg-red-600' :
            selectedType === 'medical' ? 'bg-green-500 hover:bg-green-600' :
            selectedType === 'disaster' ? 'bg-blue-500 hover:bg-blue-600' :
            'bg-yellow-500 hover:bg-yellow-600'
          }`}
          disabled={isLoading || isAnalyzing}
        >
          {isAnalyzing ? "Verifying Information..." : 
           isLoading ? "Submitting..." : "Report Emergency"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmergencyForm;