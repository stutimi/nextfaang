# NextFAANG Supabase Database Schema

This directory contains the complete database schema and migrations for the NextFAANG competitive programming platform.

## Overview

The database is designed to support a comprehensive competitive programming platform with the following features:

- User management and profiles
- Problem management with test cases
- Contest system
- Submission tracking and judging
- Achievement system
- Discussion forums
- Progress tracking
- Leaderboards and rankings

## Database Structure

### Core Tables

#### Users & Authentication
- `users` - Extended user profiles (linked to Supabase auth)
- `user_stats` - User statistics and performance metrics
- `user_skills` - User skills and proficiency levels
- `user_sessions` - User activity tracking
- `user_progress` - Individual problem progress tracking

#### Problems & Content
- `problems` - Coding problems with metadata
- `test_cases` - Test cases for problems
- `skills` - Available skills/technologies

#### Contests & Competitions
- `contests` - Contest information
- `contest_problems` - Problems included in contests
- `contest_participants` - Contest participation tracking

#### Submissions & Judging
- `submissions` - Code submissions and results

#### Community Features
- `discussions` - Forum discussions
- `discussion_replies` - Replies to discussions
- `achievements` - Available achievements
- `user_achievements` - User achievement tracking
- `notifications` - User notifications

### Key Features

#### Row Level Security (RLS)
All tables have comprehensive RLS policies that ensure:
- Users can only access their own private data
- Public data is accessible to all users
- Proper authorization for content creation and modification

#### Automatic Triggers
- User registration automatically creates profile and stats
- Submission updates trigger stat recalculation
- Achievement checking and awarding
- Problem acceptance rate updates

#### Useful Functions
- `get_leaderboard()` - Get top users by points
- `get_user_problem_stats()` - Get user's solving statistics
- `get_recent_submissions()` - Get user's recent submissions
- `award_achievement()` - Award achievements to users
- `create_notification()` - Create user notifications
- `daily_maintenance()` - Daily cleanup and updates

## Migration Files

1. **001_initial_schema.sql** - Core database schema with all tables and indexes
2. **002_rls_policies.sql** - Row Level Security policies for all tables
3. **003_functions.sql** - Database functions and triggers
4. **004_seed_data.sql** - Initial data including sample problems and achievements

## Setup Instructions

### 1. Local Development

```bash
# Initialize Supabase project
supabase init

# Start local Supabase
supabase start

# Apply migrations
supabase db reset
```

### 2. Production Deployment

```bash
# Link to your Supabase project
supabase link --project-ref your-project-ref

# Push migrations to production
supabase db push
```

### 3. Environment Variables

Make sure to set these in your `.env.local`:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Relationships

```
auth.users (Supabase Auth)
    ↓
users (Extended Profile)
    ├── user_stats (1:1)
    ├── user_skills (1:N)
    ├── user_sessions (1:N)
    ├── user_progress (1:N)
    ├── user_achievements (1:N)
    ├── submissions (1:N)
    ├── notifications (1:N)
    ├── discussions (1:N)
    └── contest_participants (1:N)

problems
    ├── test_cases (1:N)
    ├── submissions (1:N)
    ├── user_progress (1:N)
    └── contest_problems (1:N)

contests
    ├── contest_problems (1:N)
    └── contest_participants (1:N)

discussions
    └── discussion_replies (1:N)
```

## API Usage Examples

### Getting User Statistics

```sql
SELECT * FROM get_user_problem_stats('user-uuid-here');
```

### Getting Leaderboard

```sql
SELECT * FROM get_leaderboard(50); -- Top 50 users
```

### Awarding Achievement

```sql
SELECT award_achievement('user-uuid-here', 'First Problem Solved');
```

### Creating Notification

```sql
SELECT create_notification(
  'user-uuid-here',
  'Welcome!',
  'Welcome to NextFAANG!',
  'info'
);
```

## Maintenance

### Daily Tasks
Run the daily maintenance function to:
- Update user rankings
- Clean up old notifications
- Update problem statistics

```sql
SELECT daily_maintenance();
```

### Monitoring Queries

```sql
-- Active users today
SELECT COUNT(*) FROM user_sessions 
WHERE session_start >= CURRENT_DATE;

-- Problems solved today
SELECT COUNT(*) FROM submissions 
WHERE status = 'Accepted' 
AND submitted_at >= CURRENT_DATE;

-- Top problems by attempts
SELECT p.title, COUNT(s.id) as attempts
FROM problems p
JOIN submissions s ON s.problem_id = p.id
GROUP BY p.id, p.title
ORDER BY attempts DESC
LIMIT 10;
```

## Security Considerations

1. **RLS Policies** - All tables have proper RLS policies
2. **Function Security** - Functions use SECURITY DEFINER where needed
3. **Input Validation** - Database constraints prevent invalid data
4. **Audit Trail** - Created/updated timestamps on all records

## Performance Optimizations

1. **Indexes** - Strategic indexes on frequently queried columns
2. **Triggers** - Efficient triggers for real-time updates
3. **Materialized Views** - Consider for complex leaderboard queries
4. **Partitioning** - Consider for large tables like submissions

## Backup Strategy

1. **Automated Backups** - Supabase provides automatic backups
2. **Point-in-Time Recovery** - Available for production instances
3. **Export Scripts** - Regular exports of critical data

## Support

For questions about the database schema or migrations, please:
1. Check the migration files for implementation details
2. Review the RLS policies for access patterns
3. Test functions in the SQL editor
4. Create an issue if you find any problems

## Contributing

When adding new features:
1. Create a new migration file with incremental numbering
2. Add appropriate RLS policies
3. Include any necessary functions or triggers
4. Update this README with new features
5. Test thoroughly in development before production deployment