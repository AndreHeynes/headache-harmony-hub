# Admin Setup Guide

## Beta Testing Preparation Checklist

✅ **Auth Configuration**: Email auto-confirmation enabled for seamless beta testing
✅ **Admin Dashboard**: Complete admin interface at `/admin`
✅ **User Management**: View all users, subscriptions, and progress
✅ **Role Assignment**: Assign admin/moderator/user roles
✅ **Analytics**: Track key metrics (users, subscriptions, revenue, onboarding)

## Creating Your First Admin User

To access the admin dashboard, you need to assign the admin role to a user account. Follow these steps:

### Step 1: Create Your Account
1. Sign up through the app at `/register`
2. Complete the registration process
3. Note the email address you used

### Step 2: Assign Admin Role

**Option A: Using Lovable Cloud Backend**
1. Click the "View Backend" button in Lovable
2. Navigate to the "Database" section
3. Go to the `user_roles` table
4. Click "Insert row"
5. Fill in:
   - `user_id`: Your user ID (you can find this in the `profiles` table using your email)
   - `role`: Select `admin`
6. Click "Save"

**Option B: Using SQL (if you have database access)**
```sql
-- First, find your user ID
SELECT id FROM profiles WHERE full_name = 'YOUR_NAME';

-- Then insert the admin role
INSERT INTO public.user_roles (user_id, role) 
VALUES ('YOUR_USER_ID_HERE', 'admin');
```

### Step 3: Access Admin Dashboard
1. Navigate to `/admin` in your app
2. You should now see the admin dashboard with full access

## Admin Dashboard Features

### User Management Tab
- View all registered users
- See user details: name, email, roles, subscription status
- View onboarding progress and current phase
- Assign/remove roles for any user

### Analytics Tab
- Total users count
- Active subscriptions
- Completed onboarding rate
- Total revenue from subscriptions

## Role Types

- **admin**: Full access to admin dashboard and all features
- **moderator**: Can be used for future content moderation features
- **user**: Default role for all registered users

## Security Notes

- Admin access is protected by server-side role verification
- Non-admin users attempting to access `/admin` are redirected to dashboard
- Role checks use the `has_role()` database function for security
- Never store admin credentials in client-side code

## Beta Testing Recommendations

1. **Assign Multiple Admins**: Create 2-3 admin accounts for redundancy
2. **Monitor User Onboarding**: Check analytics regularly during beta
3. **Track Support Issues**: Use the user management tab to help users
4. **Role Assignment**: Assign moderator roles to trusted beta testers if needed
5. **Revenue Tracking**: Monitor subscription data for payment flow issues

## Troubleshooting

**Can't access admin dashboard?**
- Verify your user has the admin role in the `user_roles` table
- Clear browser cache and try signing in again
- Check that you're signed in with the correct account

**Role assignment not working?**
- Ensure RLS policies are properly configured
- Verify the admin role exists in the database
- Check browser console for any errors

## Next Steps for Production

Before full launch, consider adding:
- Admin activity logging
- User suspension/ban capabilities
- Bulk user management tools
- Advanced analytics and reporting
- Support ticket system integration
- Email notification controls
