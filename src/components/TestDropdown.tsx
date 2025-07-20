import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomSelect } from './CustomSelect';

export const TestDropdown = () => {
  const [userType, setUserType] = useState<string>('student');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Dropdown Test Page</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Custom Dropdown (Working Solution)</CardTitle>
            <p className="text-sm text-muted-foreground">
              This custom dropdown should definitely work! Click it to see: Student, Professional, and Teacher options.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user_type" className="text-base font-medium">I am a</Label>
              <CustomSelect
                value={userType}
                onValueChange={(value) => {
                  console.log('Custom dropdown changed to:', value);
                  setUserType(value);
                }}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'professional', label: 'Professional' },
                  { value: 'teacher', label: 'Teacher (Test Option)' }
                ]}
                placeholder="Select your type"
                className="h-12"
              />
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-base">
                <strong>Currently Selected:</strong> <span className="capitalize">{userType}</span>
              </p>
            </div>

            {userType === 'professional' && (
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                <p className="text-base text-blue-800 dark:text-blue-200 font-medium">
                  ✅ Professional mode activated!
                  <br />
                  <span className="text-sm">Organization, Designation, and Experience fields would show here.</span>
                </p>
              </div>
            )}

            {userType === 'student' && (
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border-2 border-green-300 dark:border-green-700">
                <p className="text-base text-green-800 dark:text-green-200 font-medium">
                  ✅ Student mode activated!
                  <br />
                  <span className="text-sm">College, Course, and Graduation Year fields would show here.</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Original Radix UI Select for comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Original Radix UI Select (for comparison)</CardTitle>
            <p className="text-sm text-muted-foreground">
              This is the original implementation that might not work properly.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base font-medium">I am a (Radix UI)</Label>
              <Select
                value={userType}
                onValueChange={(value) => {
                  console.log('Radix dropdown changed to:', value);
                  setUserType(value);
                }}
              >
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select your type" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4}>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="teacher">Teacher (Test Option)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Simple HTML select for comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Fallback HTML Select (for comparison)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label className="text-base font-medium">I am a (HTML Select)</Label>
              <select
                className="w-full h-12 px-3 border border-input bg-background rounded-md text-base"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
