# 🔗 Frontend-Backend Connection Guide

## 🎯 Overview

This guide ensures all frontend components can successfully access the backend API endpoints using the correct domains:

- **Backend**: `https://backend-prod-team-jobhatchs-projects.vercel.app`
- **Alternative**: `https://backend-prod-jobhatch-team-team-jobhatchs-projects.vercel.app`

## ✅ Configuration Updates Made

### 1. Frontend API Configuration
- **File**: `src/config/api.ts`
- **Updated**: Backend URL to use team domain
- **Added**: Waitlist, jobs, and health endpoints

### 2. Backend CORS Configuration
- **File**: `app/__init__.py`
- **Updated**: CORS origins to include frontend team domains
- **Added**: Multiple domain support for team accounts

### 3. Component Updates
- **ShowJob Slice**: Now uses centralized API endpoints
- **Profile Creation**: Uses centralized API endpoints
- **All API calls**: Now route through proper backend domain

## 🧪 Testing Components

### Critical Components (Must Work)
1. **Waitlist Submission** - Landing page functionality
2. **Job Listings** - Main app feature
3. **Authentication** - User login/signup
4. **Resume Upload** - Core onboarding feature
5. **Onboarding Flow** - User setup process

### Secondary Components (Should Work)
1. **Profile Management** - User profiles
2. **AI Features** - Resume analysis, cover letters
3. **Cover Letter Management** - Document handling

## 🔍 Manual Testing Steps

### Step 1: Basic API Health Check
Open browser and test these URLs:
```
https://backend-prod-team-jobhatchs-projects.vercel.app/api/health
https://backend-prod-team-jobhatchs-projects.vercel.app/api/waitlist
https://backend-prod-team-jobhatchs-projects.vercel.app/api/jobs
https://backend-prod-team-jobhatchs-projects.vercel.app/api/docs
```

**Expected**: JSON responses (not 404 errors)

### Step 2: Frontend Components Test
1. **Deploy frontend** to Vercel
2. **Test waitlist form** on landing page
3. **Test job listings** page
4. **Test authentication** modal
5. **Test onboarding flow**
6. **Test resume upload**

### Step 3: Browser Developer Tools
1. Open **Developer Tools** (F12)
2. Go to **Network** tab
3. Use frontend features
4. Check for **API calls** and **responses**
5. Verify **no 404 errors**

## 📋 API Endpoints Status

### Core Endpoints (✅ Implemented)
- `GET /api/health` - Health check
- `GET /api/waitlist` - Waitlist endpoint
- `GET /api/jobs` - Job listings
- `GET /api/auth` - Authentication
- `GET /api/onboarding` - Onboarding
- `GET /api/profiles` - Profile management
- `GET /api/resumes` - Resume management
- `GET /api/ai` - AI features
- `GET /api/docs` - API documentation

### Component Mappings
```javascript
// Authentication
authSlice.ts → /api/auth/*

// Jobs
showjobSlice.ts → /api/jobs/*

// Resumes
resumeSlice.ts → /api/resumes/*

// Onboarding
OnboardingFlow.tsx → /api/onboarding/*

// Profiles
ProfileCreationPage.tsx → /api/profiles

// Waitlist
WaitlistEmailForm.tsx → /api/waitlist
```

## 🚀 Deployment Steps

### 1. Backend Deployment
```bash
cd backend-prod
vercel --prod
```

### 2. Frontend Deployment
```bash
cd frontend-prod
vercel --prod
```

### 3. Verification
- Test API endpoints directly in browser
- Test frontend functionality
- Check browser console for errors
- Verify CORS headers in network tab

## 🐛 Troubleshooting

### Issue: 404 NOT_FOUND Errors
**Cause**: Backend not deployed with latest changes
**Solution**: Redeploy backend to Vercel

### Issue: CORS Errors
**Cause**: Frontend domain not in CORS allowlist
**Solution**: Check backend CORS configuration

### Issue: Frontend Can't Connect
**Cause**: Wrong API URL in frontend config
**Solution**: Verify API_BASE_URL in config/api.ts

### Issue: Authentication Issues
**Cause**: Credentials not being sent
**Solution**: Check `credentials: 'include'` in fetch calls

## 📊 Testing Checklist

### Backend API Tests
- [ ] Health endpoint returns 200 OK
- [ ] Waitlist endpoint returns 200 OK
- [ ] Jobs endpoint returns job data
- [ ] Auth endpoint returns user data
- [ ] All endpoints return JSON responses
- [ ] CORS headers present in responses

### Frontend Component Tests
- [ ] Waitlist form submits successfully
- [ ] Job listings load without errors
- [ ] Authentication modal works
- [ ] Onboarding flow progresses
- [ ] Resume upload completes
- [ ] Profile creation saves data
- [ ] No 404 errors in browser console

### Integration Tests
- [ ] Frontend connects to backend
- [ ] API calls return expected data
- [ ] Error handling works correctly
- [ ] User flows complete end-to-end

## 🎉 Success Indicators

### All Working Correctly
- ✅ No 404 errors in browser console
- ✅ API endpoints return JSON data
- ✅ Frontend features work as expected
- ✅ User flows complete successfully
- ✅ CORS headers present in responses

### Deployment Complete
- ✅ Backend deployed to team domain
- ✅ Frontend deployed and connected
- ✅ All critical components tested
- ✅ No critical errors in logs

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Test API endpoints directly in browser
3. Verify deployment status on Vercel
4. Check backend logs for server errors
5. Ensure both frontend and backend are deployed

---

**Ready to Test**: All configurations are updated and ready for deployment testing! 