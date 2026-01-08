# Railway Deployment Checklist

Use this checklist to ensure your app deploys successfully on Railway.

## ✅ Pre-Deployment

- [ ] All code is committed and pushed to your repository
- [ ] `package.json` has `engines` field specifying Node.js version (✅ Already added)
- [ ] `.nvmrc` file exists (✅ Already added)
- [ ] `railway.json` is configured correctly (✅ Already configured)

## 🔧 Railway Configuration

### 1. Create Railway Project
- [ ] Log in to Railway (https://railway.app)
- [ ] Create a new project
- [ ] Connect your GitHub repository OR deploy via Railway CLI

### 2. Add MySQL Database
- [ ] Click "New" → "Database" → "Add MySQL"
- [ ] Wait for MySQL service to provision
- [ ] Note the database connection variables (will be automatically added)

### 3. Set Environment Variables
Go to your **backend service** → **Variables** tab and verify/add:

**Required Variables:**
- [ ] `DB_HOST` - From MySQL service variables (usually `MYSQLHOST`)
- [ ] `DB_USER` - From MySQL service variables (usually `MYSQLUSER`)
- [ ] `DB_PASSWORD` - From MySQL service variables (usually `MYSQLPASSWORD`)
- [ ] `DB_NAME` - Set to `JetPathAirline`
- [ ] `JWT_SECRET` - Generate a secure random string (e.g., use `openssl rand -hex 32`)

**Optional Variables:**
- [ ] `OPENAI_API_KEY` - Only if using chatbot feature
- [ ] `NODE_ENV` - Set to `production`

**Note:** Railway automatically sets `PORT`, `HOST`, and database connection variables from linked services. You may need to reference them:
- If MySQL is linked, Railway creates `MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`
- You may need to set `DB_HOST=${{MySQL.MYSQLHOST}}`, `DB_USER=${{MySQL.MYSQLUSER}}`, etc.

### 4. Link MySQL Service to Backend
- [ ] In your backend service settings, ensure MySQL service is linked
- [ ] Railway will automatically inject database variables if linked correctly

## 🗄️ Database Initialization

After deployment, initialize your database:

1. **Connect to MySQL:**
   - Option 1: Use Railway's MySQL client (click on MySQL service → Connect)
   - Option 2: Use any MySQL client with connection details from Railway

2. **Create Database Schema:**
   - [ ] Run SQL commands from `init_database.sql` in your MySQL client
   - [ ] Verify tables are created: `users`, `flights`, `userflights`, `reviews`, `support_messages`

3. **Optional - Seed Data:**
   - [ ] Connect to your Railway service via SSH/CLI: `railway run bash`
   - [ ] Run: `node seedData.js` (if you have seed data)
   - [ ] Run: `node make-admin.js` (to create an admin user)

## 🚀 Deployment Verification

### Check Deployment Logs
- [ ] Go to Railway dashboard → Your service → Deployments → Latest deployment
- [ ] Check logs for:
  - ✅ "Server started successfully!"
  - ✅ "Connected to MySQL database"
  - ✅ "All routes initialized"
  - ❌ Look for any ERROR messages

### Test Endpoints

1. **Health Check:**
   ```bash
   curl https://your-app.railway.app/health
   ```
   Expected: `{"status":"ok","message":"Server is running"}`

2. **Root Endpoint:**
   ```bash
   curl https://your-app.railway.app/
   ```
   Expected: JSON with API endpoints information

3. **Test Database Connection:**
   - Try registering a user: `POST /api/Login/register`
   - Check logs for database connection errors

## 🐛 Common Issues & Solutions

### Issue: "Build failed" or "Installation failed"
**Solution:**
- Check that Node.js version is compatible (should be ≥18.0.0)
- Verify `package.json` has correct dependencies
- Check Railway logs for specific npm install errors

### Issue: "Application failed to start"
**Solution:**
- Check Railway logs for startup errors
- Verify `PORT` environment variable is set (Railway sets this automatically)
- Ensure server binds to `0.0.0.0` (already configured ✅)
- Check that `startCommand` in `railway.json` matches your `package.json` start script

### Issue: "Database connection failed"
**Solution:**
- Verify MySQL service is running in Railway
- Check that database variables are set correctly:
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- Ensure MySQL service is linked to your backend service
- Verify database `JetPathAirline` exists (create it if needed)
- Check Railway logs for specific database connection errors

### Issue: "Health check failed"
**Solution:**
- Verify `/health` endpoint returns 200 status
- Check Railway health check configuration in `railway.json`
- Ensure server starts successfully (check startup logs)

### Issue: "502 Bad Gateway" or "Application not responding"
**Solution:**
- Check that server is listening on correct port (`process.env.PORT`)
- Verify server binds to `0.0.0.0` (not `localhost` or `127.0.0.1`)
- Check Railway service logs for application errors
- Verify environment variables are set correctly

### Issue: "Module not found" errors
**Solution:**
- Ensure all dependencies are listed in `package.json`
- Check that `npm install` completed successfully (check build logs)
- Verify `package-lock.json` is committed to repository

## 📝 Post-Deployment

- [ ] Test all critical API endpoints
- [ ] Verify database operations work (register, login, etc.)
- [ ] Check that file uploads work (if using `/uploads` directory)
- [ ] Test authentication endpoints
- [ ] Monitor Railway logs for any errors
- [ ] Set up Railway monitoring/alerts if needed

## 🔄 Redeployment

If you need to redeploy:
1. Push changes to your repository
2. Railway will automatically trigger a new deployment
3. Monitor the deployment logs
4. Verify the new deployment works

## 📞 Getting Help

If issues persist:
1. Check Railway documentation: https://docs.railway.app
2. Review Railway logs for specific error messages
3. Verify all environment variables are set correctly
4. Test locally first to ensure code works

---

**Last Updated:** This checklist covers the current configuration with Node.js 18+, health checks, and proper environment variable handling.

