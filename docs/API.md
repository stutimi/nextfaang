# 🔌 NEXTFAANG API Documentation

This document provides comprehensive information about the NEXTFAANG platform's API endpoints, data structures, and integration patterns.

## 📋 Table of Contents

- [Authentication](#authentication)
- [Supabase Edge Functions](#supabase-edge-functions)
- [External API Integrations](#external-api-integrations)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

### **Supabase Authentication**
NEXTFAANG uses Supabase Auth for user management and authentication.

```typescript
import { supabase } from '@/integrations/supabase/client';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

### **Session Management**
```typescript
// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session.user);
  }
  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  }
});
```

---

## ⚡ Supabase Edge Functions

### **1. Validate Codeforces User**
Validates and fetches Codeforces user data.

**Endpoint:** `validate-codeforces-user`

**Request:**
```typescript
const { data, error } = await supabase.functions.invoke('validate-codeforces-user', {
  body: { handle: 'tourist' }
});
```

**Response:**
```typescript
interface CodeforcesUser {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  country: string;
  organization: string;
  contribution: number;
  lastOnlineTimeSeconds: number;
  registrationTimeSeconds: number;
  friendOfCount: number;
  avatar: string;
  titlePhoto: string;
}
```

### **2. Random CP Questions**
Fetches random competitive programming questions.

**Endpoint:** `random-cp-questions`

**Request:**
```typescript
const { data, error } = await supabase.functions.invoke('random-cp-questions', {
  body: { 
    count: 5,
    difficulty: 'medium',
    tags: ['dp', 'graphs']
  }
});
```

**Response:**
```typescript
interface CPProblem {
  title: string;
  difficulty: string;
  url: string;
  platform: string;
  tags: string[];
  description?: string;
  examples?: Array<{
    input: string;
    output: string;
  }>;
}
```

### **3. Duel Management**
Manages coding duels between users.

**Endpoint:** `duel-management`

**Create Duel Request:**
```typescript
const { data, error } = await supabase.functions.invoke('duel-management', {
  body: {
    action: 'create_duel',
    receiverHandle: 'opponent_handle',
    difficulty: 'medium'
  }
});
```

**Accept Duel:**
```typescript
const { data, error } = await supabase.functions.invoke('duel-management', {
  body: {
    action: 'accept_duel',
    duelId: 'duel_uuid'
  }
});
```

### **4. Room Management**
Handles multi-user coding rooms.

**Endpoint:** `room-management`

**Create Room:**
```typescript
const { data, error } = await supabase.functions.invoke('room-management', {
  body: {
    action: 'create_room',
    roomName: 'Practice Session',
    maxParticipants: 10
  }
});
```

---

## 🌐 External API Integrations

### **Codeforces API**
Integration with Codeforces for user data and contest information.

**Base URL:** `https://codeforces.com/api/`

**User Info:**
```typescript
const fetchCodeforcesUser = async (handle: string) => {
  const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
  const data = await response.json();
  return data.result[0];
};
```

**User Submissions:**
```typescript
const fetchUserSubmissions = async (handle: string, count: number = 100) => {
  const response = await fetch(
    `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=${count}`
  );
  const data = await response.json();
  return data.result;
};
```

### **GitHub API**
Integration for profile analysis and repository data.

**Base URL:** `https://api.github.com/`

**User Profile:**
```typescript
const fetchGitHubUser = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  return response.json();
};
```

**User Repositories:**
```typescript
const fetchUserRepos = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  return response.json();
};
```

---

## 🗄️ Database Schema

### **Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  codeforces_handle TEXT,
  github_username TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Duel Requests Table**
```sql
CREATE TABLE duel_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id),
  receiver_cf_handle TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  difficulty TEXT DEFAULT 'medium',
  problems JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);
```

### **Bot Matches Table**
```sql
CREATE TABLE bot_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  difficulty TEXT NOT NULL,
  problems JSONB NOT NULL,
  status TEXT DEFAULT 'active',
  score INTEGER DEFAULT 0,
  time_limit INTEGER DEFAULT 3600,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Visitor Stats Table**
```sql
CREATE TABLE visitor_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  page_visited TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);
```

---

## 🚨 Error Handling

### **Standard Error Response**
```typescript
interface APIError {
  error: string;
  message: string;
  code?: string;
  details?: any;
}
```

### **Common Error Codes**
- `USER_NOT_FOUND` - Codeforces user doesn't exist
- `INVALID_HANDLE` - Invalid Codeforces handle format
- `RATE_LIMITED` - Too many requests
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `VALIDATION_ERROR` - Invalid input data

### **Error Handling Example**
```typescript
try {
  const { data, error } = await supabase.functions.invoke('validate-codeforces-user', {
    body: { handle: 'invalid_handle' }
  });
  
  if (error) {
    switch (error.code) {
      case 'USER_NOT_FOUND':
        toast.error('Codeforces user not found');
        break;
      case 'RATE_LIMITED':
        toast.error('Too many requests. Please try again later.');
        break;
      default:
        toast.error('An unexpected error occurred');
    }
    return;
  }
  
  // Handle success
  console.log('User data:', data);
} catch (err) {
  console.error('Network error:', err);
  toast.error('Network error. Please check your connection.');
}
```

---

## ⏱️ Rate Limiting

### **Codeforces API Limits**
- **Rate Limit:** 5 requests per second
- **Daily Limit:** 18,000 requests per day
- **Burst Limit:** 10 requests in quick succession

### **Implementation**
```typescript
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests = 5;
  private readonly timeWindow = 1000; // 1 second

  async makeRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    const now = Date.now();
    
    // Remove old requests outside time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      const waitTime = this.timeWindow - (now - this.requests[0]);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.makeRequest(requestFn);
    }
    
    this.requests.push(now);
    return requestFn();
  }
}
```

---

## 📊 Analytics & Monitoring

### **Performance Tracking**
```typescript
// Track API response times
const trackAPICall = async (endpoint: string, fn: () => Promise<any>) => {
  const startTime = performance.now();
  
  try {
    const result = await fn();
    const duration = performance.now() - startTime;
    
    // Log successful API call
    console.log(`API Call: ${endpoint} - ${duration.toFixed(2)}ms`);
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    
    // Log failed API call
    console.error(`API Error: ${endpoint} - ${duration.toFixed(2)}ms`, error);
    
    throw error;
  }
};
```

### **Usage Analytics**
```typescript
// Track feature usage
const trackFeatureUsage = async (feature: string, metadata?: any) => {
  await supabase.from('feature_usage').insert({
    feature_name: feature,
    user_id: user?.id,
    metadata,
    timestamp: new Date().toISOString()
  });
};
```

---

## 🔧 Development Tools

### **API Testing**
```typescript
// Test utility for API endpoints
export const testAPI = {
  async validateCodeforcesUser(handle: string) {
    return supabase.functions.invoke('validate-codeforces-user', {
      body: { handle }
    });
  },
  
  async getRandomProblems(count: number = 5) {
    return supabase.functions.invoke('random-cp-questions', {
      body: { count }
    });
  }
};
```

### **Mock Data**
```typescript
// Mock data for development
export const mockData = {
  codeforcesUser: {
    handle: 'tourist',
    rating: 3822,
    maxRating: 3822,
    rank: 'legendary grandmaster',
    maxRank: 'legendary grandmaster'
  },
  
  problems: [
    {
      title: 'Two Sum',
      difficulty: 'easy',
      url: 'https://leetcode.com/problems/two-sum/',
      platform: 'LeetCode',
      tags: ['array', 'hash-table']
    }
  ]
};
```

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Codeforces API Documentation](https://codeforces.com/apiHelp)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*For more information or support, please contact our development team or check the GitHub repository.*