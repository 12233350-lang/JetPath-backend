# How to Redeploy to Railway

## Method 1: Automatic Deployment (Recommended) ⚡

If your Railway project is connected to GitHub, deployments happen automatically:

1. **Push your code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Railway automatically detects the push** and starts a new deployment

3. **Monitor the deployment:**
   - Go to Railway dashboard → Your project → Your service
   - Click on "Deployments" tab
   - Watch the build logs in real-time

✅ **You've already pushed, so Railway should be deploying now!**

---

## Method 2: Manual Redeploy from Dashboard 🖱️

1. Go to [Railway Dashboard](https://railway.app)
2. Select your project
3. Click on your backend service
4. Go to the **"Deployments"** tab
5. Click **"Redeploy"** button on the latest deployment
   - OR click **"Deploy"** → **"Deploy Latest"**

---

## Method 3: Using Railway CLI 🔧

### Install Railway CLI (if not installed):
```bash
# Windows (PowerShell)
iwr https://railway.app/install.ps1 -useb | iex

# macOS/Linux
curl -fsSL https://railway.app/install.sh | sh
```

### Login to Railway:
```bash
railway login
```

### Navigate to your project:
```bash
cd "C:\Users\Mohamad el Masri\Desktop\JetPath-backend"
railway link
```

### Deploy:
```bash
# Deploy current directory
railway up

# Or deploy and open logs
railway up --detach
railway logs
```

---

## Method 4: Trigger via API 🔌

You can also trigger a redeploy using Railway's API, but the above methods are simpler.

---

## ✅ Verify Your Deployment

After redeploying, verify it's working:

1. **Check Deployment Status:**
   - Go to Railway dashboard → Deployments
   - Look for ✅ "Deployed successfully" status
   - Check logs for any errors

2. **Test Health Endpoint:**
   ```bash
   curl https://your-app.railway.app/health
   ```
   Should return: `{"status":"ok","message":"Server is running"}`

3. **Test Root Endpoint:**
   ```bash
   curl https://your-app.railway.app/
   ```
   Should return API information

4. **Check Logs:**
   - In Railway dashboard → Your service → Logs
   - Look for: "🚀 Server started successfully!"
   - Look for: "✅ Connected to MySQL database"

---

## 🐛 If Deployment Fails

1. **Check Build Logs:**
   - Railway dashboard → Your service → Latest deployment
   - Look for error messages in red

2. **Common Issues:**
   - Missing environment variables → Check Variables tab
   - Database connection errors → Verify MySQL service is running
   - Build errors → Check that all dependencies are in package.json

3. **Redeploy:**
   - Try redeploying again
   - Or push a small change to trigger automatic deployment

---

## 📊 Current Status

Since you just pushed changes to GitHub:
- ✅ Code is committed
- ✅ Code is pushed to GitHub
- ⏳ Railway should be auto-deploying (if connected to GitHub)
- ⚠️ If not auto-deploying, use Method 2 (Manual Redeploy)

---

## 🔗 Quick Links

- **Railway Dashboard:** https://railway.app
- **Your Repository:** https://github.com/AwesomenessMoMo/JetPath-backend
- **Railway Docs:** https://docs.railway.app

