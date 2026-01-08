# Backend Service Environment Variables Setup

## ⚠️ Important: Set These in Your BACKEND Service, Not MySQL Service

You need to add these variables to your **Backend Service** (the Node.js service), not the MySQL service.

## 📋 Variables to Add in Backend Service

Go to: **Backend Service → Variables Tab → Add Variable**

Add each of these:

### Required Variables:

1. **DB_HOST**
   - Value: `mysql.railway.internal`
   - OR use reference: `${{MySQL.MYSQLHOST}}`

2. **DB_USER**
   - Value: `root`
   - OR use reference: `${{MySQL.MYSQLUSER}}`

3. **DB_PASSWORD**
   - Value: `HbDTxokQuHWdFOLOkDjXeMvDxvsQXfPX`
   - OR use reference: `${{MySQL.MYSQLPASSWORD}}`
   - ⚠️ Mark as "Secret" (password)

4. **DB_NAME**
   - Value: `railway`
   - OR use reference: `${{MySQL.MYSQLDATABASE}}`

5. **JWT_SECRET**
   - Value: Generate a random string (e.g., `openssl rand -hex 32`)
   - Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`
   - ⚠️ Mark as "Secret"
   - This is for JWT token signing

### Optional Variables:

6. **OPENAI_API_KEY** (only if using chatbot)
   - Value: Your OpenAI API key
   - ⚠️ Mark as "Secret"

7. **NODE_ENV**
   - Value: `production`

## 🎯 Recommended: Use Variable References

Instead of hardcoding values, use Railway's variable references:

```
DB_HOST=${{MySQL.MYSQLHOST}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
JWT_SECRET=your-generated-secret-key
NODE_ENV=production
```

This way, if MySQL credentials change, your backend automatically updates.

## 🔗 How to Link MySQL to Backend Service

1. **Make sure MySQL service is linked to Backend service:**
   - In Railway, both services should be in the same project
   - Railway automatically provides `${{MySQL.*}}` variables when services are linked

2. **If variables aren't showing:**
   - Go to Backend Service → Settings
   - Look for "Linked Services" or "Connections"
   - Ensure MySQL service is connected

## ✅ After Setting Variables

1. **Redeploy your backend** (if it's running):
   - Railway will automatically redeploy when variables change
   - OR manually trigger redeploy

2. **Check logs** to verify connection:
   - Go to Backend Service → Logs
   - Look for: `✅ Connected to MySQL database successfully`

3. **Set up database tables:**
   ```bash
   railway run node setup-database.js
   ```

4. **Seed sample data:**
   ```bash
   railway run node seedData.js
   ```

## 🧪 Test Connection

After setting variables and redeploying, test your API:

```bash
# Health check
curl https://your-app.railway.app/health

# Get flights (should return data after seeding)
curl -X POST https://your-app.railway.app/api/Flight/get-all-flights
```

## 📝 Quick Checklist

- [ ] Variables added to **Backend Service** (not MySQL service)
- [ ] All required variables set: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`
- [ ] MySQL service is linked to Backend service
- [ ] Backend redeployed
- [ ] Database tables created (`railway run node setup-database.js`)
- [ ] Sample data seeded (`railway run node seedData.js`)
- [ ] API endpoints returning data

---

**Note:** The `PORT` variable is automatically set by Railway, so you don't need to add it manually.

