# Database Setup Instructions for Railway

## 🎯 Quick Setup (Using Your Existing `railway` Database)

Based on your Railway MySQL configuration, here's the fastest way to get your data displaying:

### Step 1: Set Environment Variables in Backend Service

Go to your **Backend Service → Variables** tab in Railway and add:

```
DB_HOST=${{MySQL.MYSQLHOST}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
JWT_SECRET=your-secret-key-here-generate-random-string
```

**Or set directly** (your current values):
```
DB_HOST=mysql.railway.internal
DB_USER=root
DB_PASSWORD=HbDTxokQuHWdFOLOkDjXeMvDxvsQXfPX
DB_NAME=railway
JWT_SECRET=your-secret-key-change-this
```

### Step 2: Create Database Tables

Use Railway CLI:

```bash
# Install Railway CLI (if not installed)
iwr https://railway.app/install.ps1 -useb | iex

# Login
railway login

# Link to your project
railway link

# Create tables in your database
railway run node setup-database.js
```

This will:
- ✅ Connect to your MySQL database
- ✅ Use the existing `railway` database
- ✅ Create all required tables (users, flights, userflights, reviews, support_messages)

### Step 3: Seed Sample Flights Data

```bash
railway run node seedData.js
```

This populates your database with 20 sample flights.

### Step 4: Verify Data is Working

Test your API:
```bash
# Get all flights
curl -X POST https://your-app.railway.app/api/Flight/get-all-flights
```

Should return a JSON array with flights.

### Step 5: Create Admin User (Optional)

After registering a user through your API:
```bash
railway run node make-admin.js
```

## 🔍 Alternative: Use MySQL Client in Railway

If you prefer using Railway's web interface:

1. Go to **MySQL Service → Data** tab
2. Click **"Query"** or **"MySQL Client"**
3. Copy and paste the contents of `init_database.sql`
4. Execute the SQL script
5. Verify tables were created: `SHOW TABLES;`

## ✅ What Should Happen

After setup:
- ✅ Database tables created: `users`, `flights`, `userflights`, `reviews`, `support_messages`
- ✅ Sample flights data inserted (if you ran seedData.js)
- ✅ API endpoints return data instead of empty arrays
- ✅ Your frontend can fetch and display flights

## 🐛 Troubleshooting

**If data still not showing:**

1. Check Railway logs (Backend Service → Logs):
   - Look for "✅ Connected to MySQL database successfully"
   - Check for any database errors

2. Verify environment variables are set:
   - Go to Backend Service → Variables
   - Ensure all DB_* variables are present

3. Verify tables exist:
   ```sql
   USE railway;
   SHOW TABLES;
   SELECT COUNT(*) FROM flights;
   ```

4. Test API directly:
   ```bash
   curl -X POST https://your-app.railway.app/api/Flight/get-all-flights
   ```

## 📝 Summary

Your database name is `railway` (not `JetPathAirline`). The setup script will:
- Use `railway` database if `DB_NAME` is set to `railway` or `MYSQLDATABASE`
- Create all tables automatically
- You can seed sample data with `seedData.js`

That's it! Your data should now display. 🎉

