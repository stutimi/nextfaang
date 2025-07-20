import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomSelect } from './CustomSelect';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Edit3, 
  Save, 
  Camera, 
  Phone, 
  MapPin, 
  Building, 
  GraduationCap,
  Calendar,
  Briefcase,
  Mail,
  X,
  Check
} from 'lucide-react';
import { useAuthContext } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProfileData {
  id?: string;
  auth_user_id?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  mobile_no?: string;
  user_type?: 'student' | 'professional';
  organization_name?: string;
  designation?: string;
  experience?: number;
  college_name?: string;
  course_name?: string;
  end_year?: number;
  address?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

// Utility function to generate year options
const generateYearOptions = (startYear: number = 2000, yearsAhead: number = 4) => {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + yearsAhead;
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  return years;
};

export const EnhancedProfilePage = () => {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // Try to fetch by user_id (the existing column)
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
        return;
      }

      if (data) {
        setProfileData(data);
      } else {
        // Create initial profile if doesn't exist
        const initialProfile = {
          auth_user_id: user.id,
          username: user.user_metadata?.username || user.email?.split('@')[0] || '',
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
          user_type: 'student' as const
        };
        setProfileData(initialProfile);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null;

    try {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return null;
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      
      let avatarUrl = profileData.avatar_url;
      
      // Upload new avatar if selected
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar();
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      const updatedProfile = {
        ...profileData,
        user_id: user.id, // Use existing user_id column
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updatedProfile, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error saving profile:', error);
        toast.error('Failed to save profile');
        return;
      }

      setProfileData(updatedProfile);
      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview('');
      toast.success('Profile updated successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNumberOnlyChange = (field: keyof ProfileData, value: string) => {
    // Allow only numbers for mobile_no and end_year fields
    const numbersOnly = value.replace(/[^0-9]/g, '');
    setProfileData(prev => ({
      ...prev,
      [field]: field === 'end_year' ? (numbersOnly ? parseInt(numbersOnly) : null) : numbersOnly
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Please sign in to view your profile</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Loading profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayAvatar = avatarPreview || profileData.avatar_url || '';
  const initials = (profileData.full_name || profileData.username || 'U')
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <Card className="mb-8 border-2 border-border/50 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar Section */}
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-primary/20">
                    <AvatarImage src={displayAvatar} alt={profileData.full_name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          value={profileData.full_name || ''}
                          onChange={(e) => handleInputChange('full_name', e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={profileData.username || ''}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          placeholder="Enter username"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        {profileData.full_name || profileData.username || 'User'}
                      </h1>
                      <p className="text-muted-foreground mb-4">@{profileData.username}</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Badge variant="secondary" className="capitalize">
                          {profileData.user_type || 'student'}
                        </Badge>
                        {user.email && (
                          <Badge variant="outline">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </Badge>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} disabled={saving} size="sm">
                        {saving ? (
                          <>Saving...</>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setAvatarFile(null);
                          setAvatarPreview('');
                          fetchProfile();
                        }}
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} size="sm">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="professional">Professional/Academic</TabsTrigger>
              <TabsTrigger value="contact">Contact & Address</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      <div>
                        <Label htmlFor="user_type">I am a</Label>
                        <CustomSelect
                          value={profileData.user_type || 'student'}
                          onValueChange={(value) => handleInputChange('user_type', value)}
                          options={[
                            { value: 'student', label: 'Student' },
                            { value: 'professional', label: 'Professional' }
                          ]}
                          placeholder="Select your type"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio || ''}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          placeholder="Tell us about yourself..."
                          rows={4}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                        <p className="capitalize">{profileData.user_type || 'Not specified'}</p>
                      </div>
                      
                      {profileData.bio && (
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
                          <p className="mt-1">{profileData.bio}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Professional/Academic Tab */}
            <TabsContent value="professional">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {profileData.user_type === 'professional' ? (
                      <>
                        <Briefcase className="h-5 w-5" />
                        Professional Information
                      </>
                    ) : (
                      <>
                        <GraduationCap className="h-5 w-5" />
                        Academic Information
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      {profileData.user_type === 'professional' ? (
                        <>
                          <div>
                            <Label htmlFor="organization_name">Organization Name</Label>
                            <Input
                              id="organization_name"
                              value={profileData.organization_name || ''}
                              onChange={(e) => handleInputChange('organization_name', e.target.value)}
                              placeholder="Enter your organization name"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="designation">Designation</Label>
                            <Input
                              id="designation"
                              value={profileData.designation || ''}
                              onChange={(e) => handleInputChange('designation', e.target.value)}
                              placeholder="Enter your designation"
                            />
                          </div>

                          <div>
                            <Label htmlFor="experience">Experience (in years)</Label>
                            <Input
                              id="experience"
                              type="number"
                              value={profileData.experience || ''}
                              onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || null)}
                              placeholder="Enter your experience in years"
                              min="0"
                              max="50"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label htmlFor="college_name">College/University Name</Label>
                            <Input
                              id="college_name"
                              value={profileData.college_name || ''}
                              onChange={(e) => handleInputChange('college_name', e.target.value)}
                              placeholder="Enter your college/university name"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="course_name">Course Name</Label>
                            <Input
                              id="course_name"
                              value={profileData.course_name || ''}
                              onChange={(e) => handleInputChange('course_name', e.target.value)}
                              placeholder="e.g., Computer Science Engineering"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="end_year">Expected Graduation Year</Label>
                            <CustomSelect
                              value={profileData.end_year?.toString() || ''}
                              onValueChange={(value) => handleInputChange('end_year', value ? parseInt(value) : null)}
                              options={generateYearOptions(2000, 4)}
                              placeholder="Select graduation year"
                            />
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="space-y-4">
                      {profileData.user_type === 'professional' ? (
                        <>
                          {profileData.organization_name && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Organization</Label>
                              <p className="flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                {profileData.organization_name}
                              </p>
                            </div>
                          )}
                          
                          {profileData.designation && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Designation</Label>
                              <p className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                {profileData.designation}
                              </p>
                            </div>
                          )}

                          {profileData.experience && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Experience</Label>
                              <p className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {profileData.experience} {profileData.experience === 1 ? 'year' : 'years'}
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {profileData.college_name && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">College/University</Label>
                              <p className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4" />
                                {profileData.college_name}
                              </p>
                            </div>
                          )}
                          
                          {profileData.course_name && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Course</Label>
                              <p>{profileData.course_name}</p>
                            </div>
                          )}
                          
                          {profileData.end_year && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Graduation Year</Label>
                              <p className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {profileData.end_year}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact & Address Tab */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact & Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      <div>
                        <Label htmlFor="mobile_no">Mobile Number</Label>
                        <Input
                          id="mobile_no"
                          value={profileData.mobile_no || ''}
                          onChange={(e) => handleNumberOnlyChange('mobile_no', e.target.value)}
                          placeholder="Enter your mobile number"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={profileData.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter your address"
                          rows={3}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </p>
                      </div>
                      
                      {profileData.mobile_no && (
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Mobile Number</Label>
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {profileData.mobile_no}
                          </p>
                        </div>
                      )}
                      
                      {profileData.address && (
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {profileData.address}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};