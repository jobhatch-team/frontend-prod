import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Resume {
  id: number;
  user_id: number;
  title: string | null;
  file_url: string;
  extracted_text: string | null;
  uploaded_at: string;
}

interface ResumeState {
  allResumes: Resume[];
  userResumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  allResumes: [],
  userResumes: [],
  currentResume: null,
  loading: false,
  error: null,
};

// ----------- Async actions -----------

export const fetchAllResumes = createAsyncThunk(
  'resumes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/resumes/all', { withCredentials: true });
      return res.data.resumes as Resume[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch all resumes');
    }
  }
);

export const fetchUserResumes = createAsyncThunk(
  'resumes/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/resumes', { withCredentials: true });
      return res.data.resumes as Resume[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch user resumes');
    }
  }
);

export const fetchResumeById = createAsyncThunk(
  'resumes/fetchOne',
  async (resumeId: number, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/resumes/${resumeId}`, { withCredentials: true });
      return res.data.resume as Resume;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch resume');
    }
  }
);

export const uploadResume = createAsyncThunk(
  'resumes/upload',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/resumes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return res.data.resume as Resume;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Upload failed');
    }
  }
);

export const updateResume = createAsyncThunk(
  'resumes/update',
  async (
    { resumeId, formData }: { resumeId: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`/api/resumes/${resumeId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return res.data.resume as Resume;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Update failed');
    }
  }
);

export const deleteResume = createAsyncThunk(
  'resumes/delete',
  async (resumeId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/resumes/${resumeId}`, { withCredentials: true });
      return resumeId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Delete failed');
    }
  }
);

// ----------- Slice -----------

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    clearCurrentResume(state) {
      state.currentResume = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllResumes.fulfilled, (state, action) => {
        state.allResumes = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch User
      .addCase(fetchUserResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserResumes.fulfilled, (state, action) => {
        state.userResumes = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch One
      .addCase(fetchResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.currentResume = action.payload;
        state.loading = false;
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Upload
      .addCase(uploadResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.userResumes.unshift(action.payload);
        state.loading = false;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateResume.fulfilled, (state, action) => {
        const index = state.userResumes.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.userResumes[index] = action.payload;
        if (state.currentResume?.id === action.payload.id) state.currentResume = action.payload;
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.userResumes = state.userResumes.filter(r => r.id !== action.payload);
        state.allResumes = state.allResumes.filter(r => r.id !== action.payload);
        if (state.currentResume?.id === action.payload) state.currentResume = null;
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentResume } = resumeSlice.actions;

export default resumeSlice.reducer;


