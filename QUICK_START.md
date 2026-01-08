# Quick Start Guide - Fix Data Not Displaying

## 🎯 The Problem
Your backend is running, but no data is showing because:
1. Database tables don't exist yet
2. Backend isn't connected to MySQL

## ✅ Solution (3 Steps)

### Step 1: Set Environment Variables in Backend Service

**Go to:** Railway Dashboard → Your **Backend Service** (not MySQL) → **Variables** tab

**Add these variables:**

```
DB_HOST=mysql.railway.internal
DB_USER=root
DB_PASSWORD=HbDTxokQuHWdFOLOkDjXeMvDxvsQXfPX
DB_NAME=railway
JWT_SECRET=change-this-to-a-random-string
```

**OR use variable references** (recommended):
```
DB_HOST=${{MySQL.MYSQLHOST}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
JWT_SECRET=your-random-secret-key
```

### Step 2: Install Railway CLI (if not installed)

```bash
# Windows PowerShell
iwr https://railway.app/install.ps1 -useb | iex

# Then login
railway login
railway link
```

### Step 3: Create Database Tables and Seed Data

```bash
# Create tables
railway run node setup-database.js

# Add sample flights
railway run node seedData.js
```

## 🧪 Verify It's Working

```bash
# Test API - should return flights array
curl -X POST https://your-app.railway.app/api/Flight/get-all-flights
```

## 🎉 Done!

Your data should now be displaying. If not, check:
- Railway logs for errors
- Variables are set in **Backend Service** (not MySQL service)
- MySQL service is linked to Backend service

---

**Need more help?** See `SETUP_INSTRUCTIONS.md` or `BACKEND_ENV_SETUP.md`

