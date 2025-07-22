import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import jobsReducer from '../features/ShowJob/showjobSlice';
import resumesReducer from '../features/ManageResume/resumeSlice';
import coverLetterReducer from '../features/ManageResume/coverletterSlice';
import aiCoverLetterReducer from '../features/ManageResume/aiCoverLetterSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    resumes: resumesReducer,
    coverLetters: coverLetterReducer,
    aiCoverLetters: aiCoverLetterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;