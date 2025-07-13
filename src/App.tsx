import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DownloadPage from "./pages/DownloadPage";
import PhoneDemo from "./pages/PhoneDemo";
import OnboardingPage from "./pages/OnboardingPage";
import WebApp from "./pages/WebApp";
import LoginForm from "./features/auth/components/LoginForm";
import SignupForm from "./features/auth/components/SignupForm";
import CongratulationsPage from "./pages/CongratulationsPage";
import JobListPage from "./pages/JobListPage"
import JobDetailPage from "./pages/JobDetailPage"
import ManageResumesPage from "./pages/ManageResumePage"
import ManageCoverLettersPage from "./pages/ManageCoverLettersPage"
import ResumeUploadPage from "./pages/ResumeUploadPage";
import ResumeAnalysisPage from "./pages/ResumeAnalysisPage";
import PricingPage from "./pages/PricingPage";
import ProfileCreationPage from "./pages/ProfileCreationPage";
import JobPreferencesPage from "./pages/JobPreferencesPage";
import OnboardingCompletePage from "./pages/OnboardingCompletePage";
import FounderIntakePage from "./pages/FounderIntakePage";
import FoundersClubPage from "./pages/FoundersClubPage";
import TestPage from "./pages/TestPage";
import WaitlistPage from "./pages/WaitlistPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/phone-demo" element={<PhoneDemo />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/onboarding/upload" element={<ResumeUploadPage />} />
          <Route path="/onboarding/analyze/:resumeId" element={<ResumeAnalysisPage />} />
          <Route path="/onboarding/pricing" element={<PricingPage />} />
          <Route path="/onboarding/profile" element={<ProfileCreationPage />} />
          <Route path="/onboarding/preferences" element={<JobPreferencesPage />} />
          <Route path="/onboarding/founder-intake" element={<FounderIntakePage />} />
          <Route path="/founders-club" element={<FoundersClubPage />} />
          <Route path="/onboarding/complete" element={<OnboardingCompletePage />} />
          <Route path="/webapp" element={<WebApp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/congratulations" element={<CongratulationsPage />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/resumes" element={<ManageResumesPage />} />
          <Route path="/coverletters" element={<ManageCoverLettersPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/test" element={<TestPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;