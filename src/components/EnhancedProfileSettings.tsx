import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Edit3, 
  Save, 
  Camera, 
  X,
  Loader2,
  Settings,
  Palette,
  Bell,
  Shield,
  Mail,
  Calendar,
  Sun,
  Moon,
  Monitor,
  Globe,
  EyeOff
} from 'lucide-react';
import { useAuthContext } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';

interface ProfileData {
  id?: string;
  user_id?: string;
  username?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  avatar_url?: string;
  mobile_no?: string;
  bio?: string;
  location?: string;
  website?: string;
  created_at?: string;
  updated_at?: string;
}

interface UserPreferences {
  id?: string;
  user_id?: string;
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  timezone?: string;
  email_notifications?: boolean;
  push_notifications?: boolean;
  profile_visibility?: 'public' | 'private' | 'friends';
  show_email?: boolean;
  show_location?: boolean;
  show_activity?: boolean;
  sound_effects?: boolean;
  auto_save?: boolean;
  compact_mode?: boolean;
  contest_reminders?: boolean;
  arena_battle_invites?: boolean;
  achievement_notifications?: boolean;
  weekly_progress_report?: boolean;
  platform_updates?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const EnhancedProfileSettings = () => {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      loadProfile();
      loadPreferences();
    }
  }, [user]);

  // Debug: Log current user data
  useEffect(() => {
    if (user) {
      console.log('Current user data:', user);
      console.log('User metadata:', user.user_metadata);
      console.log('Profile data state:', profileData);
    }
  }, [user, profileData]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setProfileData(data);
      } else {
        const initialProfile = {
          id: user.id,
          username: user.user_metadata?.username || user.email?.split('@')[0] || '',
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          display_name: user.user_metadata?.display_name || user.user_metadata?.full_name || user.user_metadata?.name || '',
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
          bio: user.user_metadata?.bio || '',
          mobile_no: user.user_metadata?.mobile_no || '',
          location: user.user_metadata?.location || '',
          website: user.user_metadata?.website || '',
        };
        setProfileData(initialProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadPreferences = async () => {
    if (!user) return;

    // Skip database loading for now, use defaults
    const defaultPreferences: UserPreferences = {
      user_id: user.id,
      theme: 'system',
      language: 'en',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      email_notifications: true,
      push_notifications: true,
      profile_visibility: 'public',
      show_email: false,
      show_location: true,
      show_activity: true,
      sound_effects: true,
      auto_save: true,
      compact_mode: false,
      contest_reminders: true,
      arena_battle_invites: true,
      achievement_notifications: true,
      weekly_progress_report: true,
      platform_updates: true,
    };
    setPreferences(defaultPreferences);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Avatar file must be less than 2MB');
        return;
      }
      
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      // For now, convert to base64 and store in user metadata
      // This is a temporary solution until storage bucket is properly configured
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target?.result as string;
          resolve(base64String);
        };
        reader.onerror = () => {
          console.error('Error reading file');
          resolve(null);
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error processing avatar:', error);
      return null;
    }
  };

  const saveSettings = async () => {
    if (!user) return;

    setSaving(true);
    try {
      let avatarUrl = profileData.avatar_url;

      // Process avatar if a new file is selected
      if (avatarFile) {
        // Check file size (limit to 2MB for base64 storage)
        if (avatarFile.size > 2 * 1024 * 1024) {
          toast.error('Avatar file must be less than 2MB');
          setSaving(false);
          return;
        }
        
        const processedAvatar = await uploadAvatar(avatarFile);
        if (processedAvatar) {
          avatarUrl = processedAvatar;
        } else {
          toast.error('Failed to process avatar');
          setSaving(false);
          return;
        }
      }

      // Only include fields that exist in the database
      const updatedProfile = {
        id: user.id,
        username: profileData.username,
        full_name: profileData.full_name,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      };

      // Save profile data - only save fields that exist in current schema
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(updatedProfile, {
          onConflict: 'id',
          ignoreDuplicates: false
        });

      if (profileError) {
        console.error('Error saving profile:', profileError);
        toast.error('Failed to save profile');
        return;
      }

      // Skip preferences saving for now (table doesn't exist yet)
      console.log('Preferences would be saved:', preferences);

      // Update auth metadata with available fields
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: updatedProfile.full_name,
          avatar_url: avatarUrl
        }
      });

      if (authError) {
        console.error('Error updating auth metadata:', authError);
      }

      setProfileData(updatedProfile);
      setPreferences(preferences); // Use existing preferences since we're not saving to DB yet
      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview('');
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setAvatarFile(null);
    setAvatarPreview('');
    loadProfile();
    loadPreferences();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sign in Required</h3>
                <p className="text-muted-foreground mb-4">
                  Please sign in to access your profile settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const displayAvatar = avatarPreview || profileData.avatar_url || user.user_metadata?.avatar_url || '';
  const initials = (profileData.display_name || profileData.full_name || profileData.username || 'U')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto py-8 px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={cancelEdit}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={saveSettings}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={displayAvatar} alt={profileData.display_name} />
                      <AvatarFallback className="text-lg">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                        <Camera className="h-6 w-6 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {profileData.display_name || profileData.full_name || profileData.username || user.user_metadata?.name || 'User'}
                    </h3>
                    <p className="text-muted-foreground">@{profileData.username || user.email?.split('@')[0]}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    {profileData.location && (
                      <div className="flex items-center gap-2 mt-1">
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">{profileData.location}</span>
                      </div>
                    )}
                    {profileData.website && (
                      <div className="flex items-center gap-2 mt-1">
                        <Globe className="h-4 w-4" />
                        <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                          {profileData.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Current Profile Information Display */}
                {!isEditing && (
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-foreground">Current Profile Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Full Name:</span>
                        <span className="ml-2 text-muted-foreground">
                          {profileData.full_name || 'Not specified'}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Username:</span>
                        <span className="ml-2 text-muted-foreground">
                          {profileData.username || 'Not specified'}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>
                        <span className="ml-2 text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Display Name:</span>
                        <span className="ml-2 text-muted-foreground">
                          {profileData.display_name || 'Not specified'}
                        </span>
                      </div>
                      {profileData.bio && (
                        <div className="md:col-span-2">
                          <span className="font-medium">Bio:</span>
                          <span className="ml-2 text-muted-foreground">
                            {profileData.bio}
                          </span>
                        </div>
                      )}
                      {profileData.location && (
                        <div>
                          <span className="font-medium">Location:</span>
                          <span className="ml-2 text-muted-foreground">
                            {profileData.location}
                          </span>
                        </div>
                      )}
                      {profileData.mobile_no && (
                        <div>
                          <span className="font-medium">Mobile:</span>
                          <span className="ml-2 text-muted-foreground">
                            {profileData.mobile_no}
                          </span>
                        </div>
                      )}
                      {profileData.website && (
                        <div className="md:col-span-2">
                          <span className="font-medium">Website:</span>
                          <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">
                            {profileData.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Form Fields */}
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      {isEditing ? (
                        <Input
                          id="first_name"
                          value={profileData.first_name || ''}
                          onChange={(e) => handleInputChange('first_name', e.target.value)}
                          placeholder="Enter first name"
                        />
                      ) : (
                        <p className="py-2 px-3 bg-muted rounded-md">
                          {profileData.first_name || 'Not specified'}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      {isEditing ? (
                        <Input
                          id="last_name"
                          value={profileData.last_name || ''}
                          onChange={(e) => handleInputChange('last_name', e.target.value)}
                          placeholder="Enter last name"
                        />
                      ) : (
                        <p className="py-2 px-3 bg-muted rounded-md">
                          {profileData.last_name || 'Not specified'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="display_name">Display Name</Label>
                    {isEditing ? (
                      <Input
                        id="display_name"
                        value={profileData.display_name || ''}
                        onChange={(e) => handleInputChange('display_name', e.target.value)}
                        placeholder="How you'd like to be displayed"
                      />
                    ) : (
                      <p className="py-2 px-3 bg-muted rounded-md">
                        {profileData.display_name || 'Not specified'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={profileData.bio || ''}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    ) : (
                      <p className="py-2 px-3 bg-muted rounded-md min-h-[80px]">
                        {profileData.bio || 'No bio provided'}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile_no">Mobile Number</Label>
                      {isEditing ? (
                        <Input
                          id="mobile_no"
                          value={profileData.mobile_no || ''}
                          onChange={(e) => handleInputChange('mobile_no', e.target.value)}
                          placeholder="Enter mobile number"
                        />
                      ) : (
                        <p className="py-2 px-3 bg-muted rounded-md">
                          {profileData.mobile_no || 'Not specified'}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={profileData.location || ''}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="Enter your location"
                        />
                      ) : (
                        <p className="py-2 px-3 bg-muted rounded-md">
                          {profileData.location || 'Not specified'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={profileData.website || ''}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="Enter your website URL"
                      />
                    ) : (
                      <p className="py-2 px-3 bg-muted rounded-md">
                        {profileData.website || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme & Display
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme Preference</Label>
                    <Select
                      value={preferences.theme || 'system'}
                      onValueChange={(value) => handlePreferenceChange('theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select
                        value={preferences.language || 'en'}
                        onValueChange={(value) => handlePreferenceChange('language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                          <SelectItem value="ru">Russian</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select
                        value={preferences.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone}
                        onValueChange={(value) => handlePreferenceChange('timezone', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                          <SelectItem value="Europe/Berlin">Berlin (CET)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                          <SelectItem value="Asia/Shanghai">Shanghai (CST)</SelectItem>
                          <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                          <SelectItem value="Australia/Sydney">Sydney (AEDT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Display Options</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Compact Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Use a more compact layout to fit more content
                        </p>
                      </div>
                      <Switch
                        checked={preferences.compact_mode || false}
                        onCheckedChange={(checked) => handlePreferenceChange('compact_mode', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Sound Effects</Label>
                        <p className="text-sm text-muted-foreground">
                          Play sounds for interactions and notifications
                        </p>
                      </div>
                      <Switch
                        checked={preferences.sound_effects || false}
                        onCheckedChange={(checked) => handlePreferenceChange('sound_effects', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Save</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically save your work as you type
                        </p>
                      </div>
                      <Switch
                        checked={preferences.auto_save || false}
                        onCheckedChange={(checked) => handlePreferenceChange('auto_save', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={preferences.profile_visibility || 'public'}
                      onValueChange={(value) => handlePreferenceChange('profile_visibility', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Public - Anyone can see your profile
                          </div>
                        </SelectItem>
                        <SelectItem value="friends">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Friends Only - Only your connections can see
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <EyeOff className="h-4 w-4" />
                            Private - Only you can see your profile
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">What others can see</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Address</Label>
                        <p className="text-sm text-muted-foreground">
                          Show your email address on your public profile
                        </p>
                      </div>
                      <Switch
                        checked={preferences.show_email || false}
                        onCheckedChange={(checked) => handlePreferenceChange('show_email', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Location</Label>
                        <p className="text-sm text-muted-foreground">
                          Show your location on your public profile
                        </p>
                      </div>
                      <Switch
                        checked={preferences.show_location || false}
                        onCheckedChange={(checked) => handlePreferenceChange('show_location', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Activity Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Show when you're online and your recent activity
                        </p>
                      </div>
                      <Switch
                        checked={preferences.show_activity || false}
                        onCheckedChange={(checked) => handlePreferenceChange('show_activity', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={preferences.email_notifications || false}
                      onCheckedChange={(checked) => handlePreferenceChange('email_notifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={preferences.push_notifications || false}
                      onCheckedChange={(checked) => handlePreferenceChange('push_notifications', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Types</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Contest Reminders</Label>
                        <Switch 
                          checked={preferences.contest_reminders || false}
                          onCheckedChange={(checked) => handlePreferenceChange('contest_reminders', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Arena Battle Invites</Label>
                        <Switch 
                          checked={preferences.arena_battle_invites || false}
                          onCheckedChange={(checked) => handlePreferenceChange('arena_battle_invites', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Achievement Unlocked</Label>
                        <Switch 
                          checked={preferences.achievement_notifications || false}
                          onCheckedChange={(checked) => handlePreferenceChange('achievement_notifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Weekly Progress Report</Label>
                        <Switch 
                          checked={preferences.weekly_progress_report || false}
                          onCheckedChange={(checked) => handlePreferenceChange('weekly_progress_report', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Platform Updates</Label>
                        <Switch 
                          checked={preferences.platform_updates || false}
                          onCheckedChange={(checked) => handlePreferenceChange('platform_updates', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      </div>
    </div>
  );
};