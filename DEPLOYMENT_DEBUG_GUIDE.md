# 🐛 JobHatch Deployment Debug Guide

## 🔍 Issue Analysis

You're experiencing **404 NOT_FOUND** errors in Vercel production but it works locally. This suggests:

1. **Backend deployment issue** - Backend not properly deployed with latest changes
2. **Environment configuration** - Wrong API URLs or environment variables
3. **Domain/routing issue** - Vercel routing not configured correctly

## 🚨 Most Likely Cause

**The backend deployment is not up-to-date or failed.** Here's why:

- ✅ **Local works**: Your code is correct
- ❌ **Vercel 404s**: Backend endpoints don't exist on production
- 🔍 **venv not the issue**: Vercel handles Python environments automatically

## 🛠️ Step-by-Step Debugging

### Step 1: Check Backend Deployment Status

Open these URLs in your browser:

```
https://backend-prod-team-jobhatchs-projects.vercel.app/api/health
https://backend-prod-team-jobhatchs-projects.vercel.app/api/waitlist  
https://backend-prod-team-jobhatchs-projects.vercel.app/api/docs
```

**Expected**: JSON responses  
**If 404**: Backend needs redeployment

### Step 2: Enhanced Console Debugging

I've added comprehensive debugging to your frontend:

#### Browser Console Output
When you deploy and use the frontend, you'll see:

```
[API-CONFIG] Environment Detection {NODE_ENV: "production", ...}
[API-CONFIG] Using Production API URL {source: "Default", url: "https://..."}
[AUTO-TEST] Running automatic backend connectivity test...
[BACKEND-TEST] Testing Backend Connection
[API-CALL xyz123] GET https://backend-prod-team-jobhatchs-projects.vercel.app/api/health
```

#### Waitlist Form Debugging
The waitlist form now logs:

```
[WAITLIST-FORM] Starting waitlist submission
[WAITLIST-FORM] Attempting JobHatch backend API submission  
[API-CALL] POST /api/waitlist
[WAITLIST-FORM] ✅ Backend API submission successful
```

### Step 3: Verify Environment Variables

Check your Vercel frontend environment variables:

1. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Verify `VITE_API_URL` is set to: `https://backend-prod-team-jobhatchs-projects.vercel.app/api`

### Step 4: Backend Redeployment

If backend URLs return 404, redeploy:

```bash
cd backend-prod
vercel --prod
```

## 🔧 Debug Tools Added

### 1. Enhanced API Configuration (`src/config/api.ts`)
- ✅ Environment detection logging
- ✅ API URL verification
- ✅ Automatic endpoint testing
- ✅ Enhanced fetch wrapper with full request/response logging

### 2. Waitlist Form Debugging (`WaitlistEmailForm.tsx`)
- ✅ Form submission tracking
- ✅ Backend API attempt logging
- ✅ Fallback to Google Forms with logging
- ✅ Debug panel (shows errors automatically)

### 3. Authentication Debugging (`authSlice.ts`)
- ✅ Login process tracking
- ✅ Response data logging
- ✅ Error categorization

## 📊 Debug Console Examples

### Successful API Call:
```
[API-CALL abc123] GET https://backend-prod-team-jobhatchs-projects.vercel.app/api/health
🕐 Request Time: 2024-01-11T12:00:00.000Z
🌐 URL: https://backend-prod-team-jobhatchs-projects.vercel.app/api/health
📊 Response Status: 200
⏱️ Response Time: 245ms
📄 Response Body (JSON): {status: "healthy", message: "JobHatch API is running"}
✅ Request Successful
```

### Failed API Call (404):
```
[API-CALL def456] GET https://backend-prod-team-jobhatchs-projects.vercel.app/api/waitlist
🕐 Request Time: 2024-01-11T12:00:00.000Z
🌐 URL: https://backend-prod-team-jobhatchs-projects.vercel.app/api/waitlist
📊 Response Status: 404
⏱️ Response Time: 123ms
📄 Response Body (Text): 404: NOT_FOUND...
❌ Request Failed
Status: 404
Status Text: Not Found
```

## 🚨 Common Issues & Solutions

### Issue 1: All Endpoints Return 404
**Cause**: Backend not deployed or deployment failed  
**Solution**: Redeploy backend
```bash
cd backend-prod
vercel --prod
```

### Issue 2: Some Endpoints Work, Others Don't
**Cause**: Partial deployment or code errors  
**Solution**: Check deployment logs, redeploy

### Issue 3: CORS Errors
**Cause**: Frontend domain not in backend CORS list  
**Solution**: Already fixed in backend CORS config

### Issue 4: Environment Variable Issues
**Cause**: Wrong API URL in production  
**Solution**: Check Vercel environment variables

## 🔍 Deployment Verification Commands

### Quick Backend Test:
```bash
curl https://backend-prod-team-jobhatchs-projects.vercel.app/api/health
```

### Full Test Suite:
```bash
cd frontend-prod
node verify-backend-connection.js
```

### Browser Test:
Open `frontend-prod/test-api-connections.html` in browser

## 📝 Debugging Checklist

### Backend Verification:
- [ ] Health endpoint returns 200 OK
- [ ] Waitlist endpoint returns JSON response
- [ ] API docs endpoint lists all endpoints
- [ ] No 404 errors from any endpoint

### Frontend Verification:
- [ ] Console shows correct API URL
- [ ] Auto-test runs and reports results
- [ ] API calls show detailed request/response logs
- [ ] Environment variables are correct

### Integration Testing:
- [ ] Waitlist form submission works
- [ ] Authentication flows work
- [ ] Job listings load
- [ ] No 404 errors in console

## 🎯 Action Plan

1. **First**: Test backend URLs directly in browser
2. **If 404s**: Redeploy backend with `vercel --prod`
3. **Then**: Deploy frontend and check console logs
4. **Debug**: Use console output to identify specific issues
5. **Report**: Share console logs if issues persist

## 📞 When to Ask for Help

Share these details if issues persist:
- Backend URL test results (direct browser test)
- Frontend console logs (complete output)
- Vercel deployment logs
- Environment variable configuration

---

**The enhanced debugging will show exactly where the connection fails and why!** 