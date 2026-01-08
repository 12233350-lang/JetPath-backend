# How to Set Up Automatic Deployment from GitHub to Railway

This guide will walk you through connecting your GitHub repository to Railway for automatic deployments.

## 🚀 Step-by-Step Instructions

### Method 1: Connect GitHub Repository (Recommended)

#### Step 1: Go to Railway Dashboard
1. Open [Railway Dashboard](https://railway.app)
2. Log in to your account

#### Step 2: Create a New Project (if you haven't already)
1. Click **"New Project"** button (top right)
2. Select **"Deploy from GitHub repo"**

#### Step 3: Connect GitHub Account
1. Railway will prompt you to connect your GitHub account
2. Click **"Connect GitHub"** or **"Authorize Railway"**
3. You'll be redirected to GitHub to authorize Railway
4. Click **"Authorize railway"** (or similar)
5. Grant Railway access to your repositories

#### Step 4: Select Your Repository
1. After authorization, Railway will show your GitHub repositories
2. Search for: `JetPath-backend` or `AwesomenessMoMo/JetPath-backend`
3. Click on your repository
4. Railway will create a new project and start deploying automatically

#### Step 5: Configure the Service
1. Railway will automatically detect it's a Node.js project
2. It will install dependencies and start the server
3. **Wait for the first deployment to complete**

---

### Method 2: Connect Existing Project to GitHub

If you already have a Railway project, you can connect it to GitHub:

#### Step 1: Go to Your Service Settings
1. In Railway Dashboard → Select your project
2. Click on your **backend service**
3. Go to **"Settings"** tab

#### Step 2: Connect GitHub
1. Scroll down to **"Source"** section
2. Click **"Connect GitHub"** or **"Change Source"**
3. Authorize Railway (if not already done)
4. Select your repository: `AwesomenessMoMo/JetPath-backend`
5. Select the branch: `main` (or your default branch)
6. Click **"Deploy"**

---

## ✅ Verify Automatic Deployment is Enabled

### Check Deployment Settings:
1. Go to your service → **"Settings"** tab
2. Look for **"Source"** section:
   - ✅ Should show: `GitHub - AwesomenessMoMo/JetPath-backend`
   - ✅ Should show: `Branch: main`
   - ✅ Should show: **"Auto Deploy: Enabled"**

### Enable Auto-Deploy (if disabled):
1. In **"Settings"** → **"Source"** section
2. Make sure **"Auto Deploy"** toggle is **ON** ✅
3. This ensures Railway automatically deploys on every push to the connected branch

---

## 🧪 Test Automatic Deployment

### Step 1: Make a Small Change
```bash
# In your project directory
echo "# Test auto-deploy" >> README.md
git add README.md
git commit -m "Test automatic deployment"
git push origin main
```

### Step 2: Watch Railway Dashboard
1. Go to Railway Dashboard → Your project → Your service
2. Click on **"Deployments"** tab
3. Within 10-30 seconds, you should see:
   - A new deployment starting
   - Build logs appearing
   - Deployment status updating

### Step 3: Verify Success
- ✅ Deployment status should show "Active" or "Success"
- ✅ Your changes should be live on Railway

---

## 🔧 Configuration Options

### Branch Selection:
- Railway can deploy from any branch
- Default is usually `main` or `master`
- To change branch: Settings → Source → Select different branch

### Manual Deploy vs Auto-Deploy:
- **Auto-Deploy (ON)**: Automatically deploys on every push
- **Auto-Deploy (OFF)**: Only deploys when you manually trigger it

### Deploy on Pull Request:
- Railway can also deploy preview environments for pull requests
- Enable in Settings → Deployments → Enable PR Deployments

---

## 📊 Monitor Deployments

### View All Deployments:
1. Railway Dashboard → Your service → **"Deployments"** tab
2. See all past deployments with:
   - Status (Active, Failed, Building)
   - Commit message
   - Deployment time
   - Build logs

### Watch Deployment Logs:
1. Click on any deployment
2. View real-time build logs
3. See server startup logs
4. Debug any issues

---

## 🔍 Troubleshooting

### Issue: "Repository not found"
**Solution:**
- Make sure you've authorized Railway to access your GitHub account
- Verify the repository name is correct
- Check that the repository is public or you've granted access to private repos

### Issue: "Auto-deploy not working"
**Solution:**
1. Go to Settings → Source
2. Verify Auto-Deploy toggle is ON
3. Check that the correct branch is selected
4. Try pushing a new commit to trigger deployment

### Issue: "Deployment fails"
**Solution:**
1. Check deployment logs for errors
2. Verify all environment variables are set
3. Check that `package.json` and dependencies are correct
4. Ensure `railway.json` is properly configured

### Issue: "Want to deploy from a different branch"
**Solution:**
1. Settings → Source → Change branch
2. Select the branch you want (e.g., `develop`, `staging`)
3. Railway will deploy from that branch instead

---

## 🎯 Best Practices

### 1. Always Push to Main for Production
```bash
git checkout main
git merge your-feature-branch
git push origin main
# Railway auto-deploys immediately
```

### 2. Use Branch Protection
- Protect `main` branch on GitHub
- Require pull request reviews
- Railway will still auto-deploy after merge

### 3. Monitor Deployments
- Check Railway dashboard after each push
- Review logs for any warnings or errors
- Test your endpoints after deployment

### 4. Use Environment Variables
- Never commit secrets to GitHub
- Use Railway's Variables tab for sensitive data
- Variables are automatically available to your app

---

## ✅ Quick Checklist

After setting up auto-deploy, verify:

- [ ] GitHub repository is connected to Railway
- [ ] Auto-Deploy is enabled in Railway settings
- [ ] Correct branch (main) is selected
- [ ] Test deployment works (push a change)
- [ ] Deployment logs show successful build
- [ ] Server starts correctly (check logs)
- [ ] Application is accessible (test endpoints)

---

## 📝 Current Status

For your repository `AwesomenessMoMo/JetPath-backend`:

1. ✅ Code is already on GitHub
2. ⏳ Connect Railway to GitHub (follow steps above)
3. ⏳ Enable Auto-Deploy
4. ✅ Railway configuration (`railway.json`) is ready
5. ✅ Package.json is configured correctly
6. ✅ Environment variables are set

---

## 🔗 Quick Links

- **Railway Dashboard:** https://railway.app
- **Your GitHub Repo:** https://github.com/AwesomenessMoMo/JetPath-backend
- **Railway Docs:** https://docs.railway.app/deploy/github
- **Railway Support:** https://railway.app/support

---

## 🎉 Once Connected

After connecting GitHub to Railway:

1. **Every `git push`** to the main branch automatically triggers a new deployment
2. **Railway builds and deploys** your application automatically
3. **You get instant feedback** in the Railway dashboard
4. **No manual steps needed** - just push and it deploys!

**That's it! Your automatic deployment pipeline is now set up! 🚀**

