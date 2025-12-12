# Database Migration: Add lastHeartUpdate Column

## Step 1: Add Column in Appwrite Console

1. Open your **Appwrite Console** in the browser
2. Navigate to: **Databases** → **rizal-quest-db** → **users** table
3. Click the **"Add Attribute"** button
4. Configure the new attribute:
   - **Type**: `DateTime`
   - **Key**: `lastHeartUpdate`
   - **Size**: (default)
   - **Required**: `No` (leave unchecked)
   - **Array**: `No` (leave unchecked)
   - **Default**: Leave empty or set to current datetime
5. Click **"Create"**
6. Wait for the attribute to be created (status should show "Available")

## Step 2: Update Existing Users (Optional)

If you have existing users in the database, you can update them with the current timestamp:

```bash
# Install ts-node if you don't have it
npm install -g ts-node

# Run the update script
npx ts-node scripts/update-existing-users.ts
```

Or you can manually update users through the Appwrite Console:
1. Go to the users table
2. Click on each user document
3. Add the `lastHeartUpdate` field with the current datetime

## Step 3: Test

1. Log in to your application
2. Check that the heart timer appears and counts down
3. Answer a question wrong to lose a heart
4. Verify the timer shows the correct countdown (10:00 initially)
5. Refresh the page and verify hearts and timer persist correctly

## What This Column Does

The `lastHeartUpdate` column stores the timestamp of when a user's hearts were last updated (either decreased or regenerated). This allows the system to:

- Calculate how many hearts should have regenerated when a user logs back in
- Show an accurate countdown timer for the next heart regeneration
- Persist heart regeneration across sessions (not just in localStorage)

## Rollback

If you need to remove this column:
1. Go to Appwrite Console → Databases → rizal-quest-db → users
2. Find the `lastHeartUpdate` attribute
3. Click the delete icon
4. Confirm deletion
