# Quick Database Setup for Railway

## 🎯 Your Current Setup

Based on your Railway MySQL variables:
- **Database Name**: `railway` (default Railway database)
- **Host**: `mysql.railway.internal`
- **User**: `root`
- **Port**: `3306`

## ⚠️ Important: You Have Two Options

### Option 1: Use Existing `railway` Database (Easiest) ✅

Use the existing `railway` database that Railway created.

**Steps:**

1. **Go to your Backend Service → Variables tab** in Railway

2. **Add these variables** (if not already set):
   ```
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}
   USE_EXISTING_DB=true
   ```

   Or set directly:
   ```
   DB_HOST=mysql.railway.internal
   DB_USER=root
   DB_PASSWORD=HbDTxokQuHWdFOLOkDjXeMvDxvsQXfPX
   DB_NAME=railway
   USE_EXISTING_DB=true
   ```

3. **Open Railway CLI or MySQL Client** and run:
   ```bash
   railway run node setup-database.js
   ```

4. **Seed sample flights** (optional):
   ```bash
   railway run node seedData.js
   ```

### Option 2: Create New `JetPathAirline` Database

Create a separate database for your app.

**Steps:**

1. **Connect to MySQL** using Railway's MySQL client or CLI

2. **Create the database**:
   ```sql
   CREATE DATABASE JetPathAirline CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Set environment variables** in your Backend Service → Variables:
   ```
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=JetPathAirline
   ```

4. **Run setup script**:
   ```bash
   railway run node setup-database.js
   ```

5. **Seed sample flights**:
   ```bash
   railway run node seedData.js
   ```

## 🚀 Recommended: Use Option 1 (Existing Database)

Since Railway already created the `railway` database for you, this is the easiest path.

### Complete Setup Steps:

1. **Set Environment Variables** (Backend Service → Variables):
   ```
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}
   JWT_SECRET=your-secret-key-change-this
   USE_EXISTING_DB=true
   ```

2. **Install Railway CLI** (if not installed):
   ```bash
   iwr https://railway.app/install.ps1 -useb | iex
   ```

3. **Login and link**:
   ```bash
   railway login
   railway link
   ```

4. **Create database tables**:
   ```bash
   railway run node setup-database.js
   ```

5. **Seed sample flights**:
   ```bash
   railway run node seedData.js
   ```

6. **Verify data**:
   - Go to your Railway app URL
   - Test: `POST https://your-app.railway.app/api/Flight/get-all-flights`
   - Should return flights array

7. **Create admin user** (after registering a user first):
   ```bash
   railway run node make-admin.js
   ```

## 🔍 Verify Setup

After running setup, check Railway logs:

1. Go to **Backend Service → Logs**
2. Look for:
   - ✅ "Connected to MySQL database successfully"
   - ✅ "Database: railway" (or JetPathAirline)
   - ✅ "Found X flights in database"

## 📝 Quick Test

After setup, test your API:

```bash
# Test health endpoint
curl https://your-app.railway.app/health

# Test flights endpoint
curl -X POST https://your-app.railway.app/api/Flight/get-all-flights

# Should return JSON with flights array
```

## ⚠️ Troubleshooting

**If you see "Unknown database":**
- Check `DB_NAME` matches your actual database name
- Make sure MySQL service is linked to backend service

**If you see "Access denied":**
- Verify `DB_USER` and `DB_PASSWORD` are correct
- Check they match the MySQL service variables

**If data still not showing:**
- Run `railway run node setup-database.js` again
- Check Railway logs for errors
- Verify tables exist: run SQL `SHOW TABLES;`

---

**Need help?** Check `RAILWAY_DATABASE_SETUP.md` for detailed troubleshooting.

