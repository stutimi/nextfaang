# 🚀 NEXTFAANG API Documentation

## 📋 Overview

The NEXTFAANG API provides programmatic access to competitive programming data, user analytics, contest information, and platform features. Our RESTful API is built on Supabase and offers real-time capabilities for live features like coding duels and performance tracking.

### **🌐 Base URL**
```
Production: https://ksesqwvwppigjpmpjutx.supabase.co/rest/v1/
Staging: https://staging-api.nextfaang.com/v1/
```

### **🔑 Authentication**
```bash
# API Key Authentication
Authorization: Bearer YOUR_SUPABASE_ANON_KEY

# User Authentication (for protected endpoints)
Authorization: Bearer USER_JWT_TOKEN
```

---

## 🏗️ API Architecture

### **🔧 Core Services**
- **User Management**: Authentication, profiles, preferences
- **Contest Analytics**: Performance tracking, rating analysis
- **Problem Database**: CP problems, solutions, difficulty ratings
- **Duel System**: Real-time 1v1 matches, bot games
- **Educational Content**: Courses, tutorials, progress tracking

### **📊 Data Flow**
```mermaid
graph LR
    A[Client App] --> B[Supabase API Gateway]
    B --> C[PostgreSQL Database]
    B --> D[Edge Functions]
    D --> E[External APIs]
    E --> F[Codeforces API]
    E --> G[GitHub API]
    E --> H[LeetCode API]
```

---

## 🔐 Authentication

### **🎫 API Key Setup**
```javascript
// Initialize Supabase client
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ksesqwvwppigjpmpjutx.supabase.co',
  'YOUR_SUPABASE_ANON_KEY'
)
```

### **👤 User Authentication**
```javascript
// Sign up new user
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure_password'
})

// Sign in existing user
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure_password'
})

// Get current session
const { data: { session } } = await supabase.auth.getSession()
```

---

## 👤 User Management API

### **📝 User Registration**
```http
POST /auth/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "data": {
    "username": "cp_enthusiast",
    "full_name": "John Doe",
    "preferred_language": "cpp"
  }
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "username": "cp_enthusiast",
      "full_name": "John Doe"
    }
  }
}
```

### **👤 Get User Profile**
```http
GET /rest/v1/profiles?id=eq.{user_id}
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "id": "uuid",
  "username": "cp_enthusiast",
  "full_name": "John Doe",
  "avatar_url": "https://...",
  "codeforces_handle": "cf_handle",
  "codechef_handle": "cc_handle",
  "leetcode_handle": "lc_handle",
  "current_rating": 1500,
  "max_rating": 1650,
  "problems_solved": 250,
  "contests_participated": 45,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

### **✏️ Update User Profile**
```http
PATCH /rest/v1/profiles?id=eq.{user_id}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "codeforces_handle": "new_cf_handle",
  "preferred_language": "python",
  "bio": "Aspiring competitive programmer"
}
```

---

## 🏆 Contest Analytics API

### **📊 Get User Contest Performance**
```http
GET /rest/v1/rpc/get_user_contest_analytics
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "user_id": "uuid",
  "platform": "codeforces",
  "time_range": "6_months"
}
```

**Response:**
```json
{
  "summary": {
    "total_contests": 25,
    "rating_change": "+150",
    "best_rank": 245,
    "average_rank": 1250,
    "problems_solved": 75
  },
  "rating_history": [
    {
      "contest_id": 1234,
      "contest_name": "Codeforces Round #800",
      "date": "2024-01-15",
      "old_rating": 1400,
      "new_rating": 1450,
      "rank": 500,
      "problems_solved": 3
    }
  ],
  "performance_trends": {
    "rating_trend": "increasing",
    "consistency_score": 0.75,
    "improvement_rate": 0.12
  }
}
```

### **📈 Get Platform Statistics**
```http
GET /rest/v1/rpc/get_platform_statistics
Authorization: Bearer {jwt_token}

{
  "platforms": ["codeforces", "codechef", "leetcode"],
  "user_id": "uuid"
}
```

**Response:**
```json
{
  "codeforces": {
    "handle": "cf_handle",
    "rating": 1500,
    "max_rating": 1650,
    "rank": "Expert",
    "problems_solved": 150,
    "contest_count": 25
  },
  "codechef": {
    "handle": "cc_handle",
    "rating": 1800,
    "max_rating": 1900,
    "stars": 4,
    "problems_solved": 200,
    "contest_count": 30
  },
  "leetcode": {
    "handle": "lc_handle",
    "rating": 1700,
    "problems_solved": 300,
    "acceptance_rate": 0.85,
    "contest_count": 15
  }
}
```

---

## 📚 Problem Database API

### **🔍 Search Problems**
```http
GET /rest/v1/rpc/search_problems
Content-Type: application/json

{
  "query": "dynamic programming",
  "difficulty": ["medium", "hard"],
  "platforms": ["codeforces", "leetcode"],
  "tags": ["dp", "graphs"],
  "limit": 20,
  "offset": 0
}
```

**Response:**
```json
{
  "problems": [
    {
      "id": "cf_1234A",
      "title": "Maximum Subarray Sum",
      "platform": "codeforces",
      "difficulty": "medium",
      "rating": 1500,
      "tags": ["dp", "arrays"],
      "url": "https://codeforces.com/problem/1234/A",
      "solved_count": 15000,
      "acceptance_rate": 0.45,
      "time_limit": 2000,
      "memory_limit": 256
    }
  ],
  "total_count": 150,
  "has_more": true
}
```

### **📝 Get Problem Details**
```http
GET /rest/v1/problems?id=eq.{problem_id}
```

**Response:**
```json
{
  "id": "cf_1234A",
  "title": "Maximum Subarray Sum",
  "description": "Given an array of integers...",
  "input_format": "First line contains n...",
  "output_format": "Print the maximum sum...",
  "constraints": "1 ≤ n ≤ 10^5",
  "examples": [
    {
      "input": "5\n1 -2 3 4 -1",
      "output": "7",
      "explanation": "Subarray [3, 4] has maximum sum 7"
    }
  ],
  "editorial": {
    "approach": "Use Kadane's algorithm...",
    "time_complexity": "O(n)",
    "space_complexity": "O(1)",
    "code_cpp": "// C++ solution here",
    "code_python": "# Python solution here"
  }
}
```

### **➕ Submit Problem Solution**
```http
POST /rest/v1/user_submissions
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "problem_id": "cf_1234A",
  "language": "cpp",
  "code": "#include<iostream>\n// solution code",
  "verdict": "accepted",
  "execution_time": 150,
  "memory_used": 1024,
  "submission_url": "https://codeforces.com/submission/123456"
}
```

---

## ⚔️ Duel System API

### **🎮 Create Duel Request**
```http
POST /rest/v1/rpc/create_duel_request
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "opponent_handle": "opponent_cf_handle",
  "difficulty_range": [1200, 1600],
  "duration_minutes": 30,
  "problem_count": 3,
  "message": "Let's have a friendly duel!"
}
```

**Response:**
```json
{
  "duel_id": "uuid",
  "status": "pending",
  "created_at": "2024-01-15T12:00:00Z",
  "expires_at": "2024-01-15T12:15:00Z",
  "problems": [
    {
      "id": "cf_1234A",
      "title": "Problem A",
      "difficulty": 1300
    }
  ]
}
```

### **✅ Accept/Reject Duel**
```http
POST /rest/v1/rpc/respond_to_duel
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "duel_id": "uuid",
  "action": "accept", // or "reject"
  "message": "Challenge accepted!"
}
```

### **📊 Get Duel Results**
```http
GET /rest/v1/duels?id=eq.{duel_id}
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "completed",
  "participants": [
    {
      "user_id": "uuid1",
      "handle": "player1",
      "score": 250,
      "problems_solved": 2,
      "total_time": 1800
    },
    {
      "user_id": "uuid2", 
      "handle": "player2",
      "score": 180,
      "problems_solved": 1,
      "total_time": 2100
    }
  ],
  "winner": "uuid1",
  "started_at": "2024-01-15T12:00:00Z",
  "ended_at": "2024-01-15T12:30:00Z"
}
```

---

## 📊 Analytics & Insights API

### **📈 Get Learning Progress**
```http
GET /rest/v1/rpc/get_learning_progress
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "user_id": "uuid",
  "time_period": "last_month"
}
```

**Response:**
```json
{
  "overall_progress": {
    "problems_solved": 45,
    "new_topics_learned": 8,
    "skill_improvement": 0.15,
    "consistency_score": 0.78
  },
  "topic_breakdown": {
    "dynamic_programming": {
      "problems_solved": 12,
      "accuracy": 0.83,
      "average_difficulty": 1400
    },
    "graphs": {
      "problems_solved": 8,
      "accuracy": 0.75,
      "average_difficulty": 1500
    }
  },
  "recommendations": [
    {
      "type": "topic",
      "topic": "segment_trees",
      "reason": "Next logical step after mastering basic trees",
      "difficulty": "medium"
    }
  ]
}
```

### **🎯 Get Personalized Recommendations**
```http
POST /rest/v1/rpc/get_recommendations
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "user_id": "uuid",
  "recommendation_type": "problems", // or "topics", "contests"
  "count": 10,
  "difficulty_preference": "adaptive"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "type": "problem",
      "problem_id": "cf_1500B",
      "title": "Tree Queries",
      "difficulty": 1600,
      "tags": ["trees", "dfs"],
      "reason": "Builds on your recent tree problem solving",
      "confidence": 0.85
    }
  ],
  "explanation": "Based on your recent activity and skill level, these problems will help you improve in weak areas while building on your strengths."
}
```

---

## 🔄 Real-time Features

### **📡 WebSocket Connection**
```javascript
// Connect to real-time features
const channel = supabase
  .channel('duel_updates')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'duels',
    filter: `participant_id=eq.${userId}`
  }, (payload) => {
    console.log('Duel update:', payload)
  })
  .subscribe()
```

### **⚡ Live Contest Updates**
```javascript
// Subscribe to live contest updates
const contestChannel = supabase
  .channel('contest_updates')
  .on('broadcast', { event: 'ranking_update' }, (payload) => {
    updateLeaderboard(payload.rankings)
  })
  .subscribe()
```

---

## 📋 Rate Limiting

### **🚦 Rate Limits**
| Endpoint Type | Requests per Minute | Burst Limit |
|---------------|-------------------|-------------|
| Authentication | 10 | 20 |
| User Data | 60 | 100 |
| Problem Search | 30 | 50 |
| Contest Analytics | 20 | 40 |
| Duel Operations | 15 | 25 |

### **📊 Rate Limit Headers**
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1642694400
```

---

## ❌ Error Handling

### **🚨 Error Response Format**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request parameters are invalid",
    "details": {
      "field": "difficulty",
      "issue": "must be one of: easy, medium, hard"
    },
    "request_id": "req_123456789"
  }
}
```

### **📋 Common Error Codes**
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `VALIDATION_ERROR` | 422 | Invalid request data |
| `INTERNAL_ERROR` | 500 | Server error |

---

## 🧪 Testing & Development

### **🔧 Development Environment**
```bash
# Set up local development
git clone https://github.com/nextfaang/api
cd api
npm install

# Configure environment
cp .env.example .env.local
# Add your Supabase credentials

# Start development server
npm run dev
```

### **🧪 API Testing**
```bash
# Run API tests
npm run test:api

# Test specific endpoints
npm run test:api -- --grep "user management"

# Load testing
npm run test:load
```

### **📚 Postman Collection**
Download our comprehensive Postman collection:
- [NEXTFAANG API Collection](https://nextfaang.com/api/postman)
- Includes all endpoints with examples
- Pre-configured authentication
- Test scripts for validation

---

## 📞 Support & Resources

### **🆘 Getting Help**
- **📖 Documentation**: [Full API docs](https://docs.nextfaang.com/api)
- **💬 Discord**: [Developer channel](https://discord.gg/nextfaang-dev)
- **📧 Email**: api-support@nextfaang.com
- **🐛 Issues**: [GitHub Issues](https://github.com/nextfaang/api/issues)

### **🔗 Useful Links**
- **🌐 API Status**: [status.nextfaang.com](https://status.nextfaang.com)
- **📊 API Analytics**: [analytics.nextfaang.com](https://analytics.nextfaang.com)
- **🔑 API Keys**: [dashboard.nextfaang.com](https://dashboard.nextfaang.com)

---

## 📈 Changelog & Versioning

### **🔄 API Versioning**
- We use semantic versioning (MAJOR.MINOR.PATCH)
- Breaking changes increment MAJOR version
- New features increment MINOR version
- Bug fixes increment PATCH version

### **📅 Recent Updates**
- **v2.1.0** (2024-01-15): Added duel system APIs
- **v2.0.0** (2024-01-01): Major API restructure
- **v1.5.2** (2023-12-15): Performance improvements
- **v1.5.1** (2023-12-01): Bug fixes and stability

---

**🚀 Happy coding with the NEXTFAANG API!**

*For the latest updates and detailed examples, visit our [interactive API documentation](https://docs.nextfaang.com/api).*