# Profile Settings Testing Guide

## 🚀 **Pre-Testing Setup**

### 1. Start Development Environment
```bash
npm run dev
# Server should be running on http://localhost:3000
```

### 2. Database Migration Status
- ✅ Enhanced `profiles` table with all fields
- ✅ New `user_preferences` table created
- ✅ Avatar storage bucket configured
- ✅ RLS policies applied

## 🧪 **Manual Testing Checklist**

### **Test 1: Profile Information**
1. Navigate to `/profile` or profile settings page
2. Sign in with a test account
3. Click "Edit Profile" button
4. Test each field:
   - ✅ First Name
   - ✅ Last Name  
   - ✅ Display Name
   - ✅ Bio (textarea)
   - ✅ Mobile Number
   - ✅ Location
   - ✅ Website URL
5. Click "Save Changes"
6. Verify data persists after page refresh

### **Test 2: Avatar Upload**
1. Click on avatar area while editing
2. Select an image file (< 5MB)
3. Verify preview appears
4. Save changes
5. Check avatar displays correctly
6. Verify file uploaded to Supabase storage

### **Test 3: Appearance Settings**
1. Go to "Appearance" tab
2. Test theme selection:
   - ✅ Light theme
   - ✅ Dark theme
   - ✅ System theme
3. Test language dropdown
4. Test timezone selection
5. Toggle display options:
   - ✅ Compact mode
   - ✅ Sound effects
   - ✅ Auto save
6. Save and verify persistence

### **Test 4: Privacy Settings**
1. Go to "Privacy" tab
2. Test profile visibility:
   - ✅ Public
   - ✅ Friends only
   - ✅ Private
3. Toggle visibility options:
   - ✅ Show email
   - ✅ Show location
   - ✅ Show activity
4. Save and verify settings

### **Test 5: Notification Preferences**
1. Go to "Notifications" tab
2. Toggle main notification types:
   - ✅ Email notifications
   - ✅ Push notifications
3. Test specific notification types:
   - ✅ Contest reminders
   - ✅ Arena battle invites
   - ✅ Achievement notifications
   - ✅ Weekly progress reports
   - ✅ Platform updates
4. Save and verify all settings persist

## 🔍 **Database Verification**

### Check Data in Supabase Dashboard
1. Open Supabase project dashboard
2. Go to Table Editor
3. Verify data in tables:
   - `profiles`: Check all profile fields are populated
   - `user_preferences`: Check all preference settings saved
4. Check Storage bucket:
   - `avatars`: Verify uploaded images

## 🐛 **Common Issues to Check**

### **Profile Data Issues**
- ❌ Fields not saving → Check database schema
- ❌ Avatar not uploading → Check storage policies
- ❌ Data not loading → Check RLS policies

### **Preferences Issues**
- ❌ Theme not persisting → Check user_preferences table
- ❌ Notifications not saving → Check preference fields
- ❌ Form validation errors → Check required fields

### **UI/UX Issues**
- ❌ Loading states not showing → Check isSaving state
- ❌ Error messages not displaying → Check toast notifications
- ❌ Form not responsive → Check mobile layout

## ✅ **Success Criteria**

### **All Features Working:**
1. ✅ Profile information saves and loads correctly
2. ✅ Avatar upload and display functional
3. ✅ All preference settings persist
4. ✅ Real-time validation and feedback
5. ✅ Responsive design on all devices
6. ✅ Proper error handling and user feedback
7. ✅ Data security with RLS policies
8. ✅ Cross-session persistence

## 🎯 **Next Steps After Testing**
- Document any bugs found
- Verify performance with large datasets
- Test with different user roles
- Validate security and data privacy