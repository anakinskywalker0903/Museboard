# 🚀 MuseBoard Deployment Guide

## 📋 **Steps to Deploy MuseBoard for AI 2025 Hackathon**

### **Step 1: Create GitHub Repository**

1. **Go to GitHub.com** and sign in
2. **Click "New Repository"** (green button)
3. **Repository name:** `museboard`
4. **Description:** `AI-powered brainstorming whiteboard for AI 2025 hackathon`
5. **Make it Public** (so it's free to deploy)
6. **Don't initialize** with README (we already have one)
7. **Click "Create Repository"**

### **Step 2: Push Your Code to GitHub**

**Open Command Prompt/PowerShell in your project folder and run:**

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: MuseBoard AI brainstorming tool"

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/museboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Step 3: Update Homepage URL**

**In package.json, change line 5:**
```json
"homepage": "https://YOUR_USERNAME.github.io/museboard"
```

### **Step 4: Deploy to GitHub Pages**

```bash
# Deploy to GitHub Pages
npm run deploy
```

### **Step 5: Enable GitHub Pages**

1. **Go to your GitHub repository**
2. **Click "Settings" tab**
3. **Scroll down to "Pages" section**
4. **Source:** Select "Deploy from a branch"
5. **Branch:** Select "gh-pages" and "/ (root)"
6. **Click "Save"**

### **Step 6: Share with Your Friend**

**Your MuseBoard will be live at:**
```
https://YOUR_USERNAME.github.io/museboard
```

**Share this URL with your friend in Toronto!**

---

## 🎯 **Quick Commands Summary**

```bash
# 1. Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit: MuseBoard AI brainstorming tool"
git remote add origin https://github.com/YOUR_USERNAME/museboard.git
git branch -M main
git push -u origin main

# 2. Deploy to GitHub Pages
npm run deploy
```

---

## 🔧 **Troubleshooting**

**If deployment fails:**
1. Make sure you're logged into GitHub
2. Check your repository name matches the homepage URL
3. Wait 5-10 minutes after enabling Pages

**If your friend can't access:**
1. Make sure the repository is public
2. Check the GitHub Pages URL is correct
3. Try refreshing the page

---

## 🏆 **For AI 2025 Hackathon Submission**

**Your submission will include:**
- ✅ Live demo URL: `https://YOUR_USERNAME.github.io/museboard`
- ✅ GitHub repository: `https://github.com/YOUR_USERNAME/museboard`
- ✅ Complete README with features and demo script
- ✅ AI-powered brainstorming functionality
- ✅ Chrome AI API integration (mock system ready for real APIs)

**Perfect for hackathon judges to test your app!** 🚀
