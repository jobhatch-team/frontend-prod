import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface CoverLetter {
  id: number;
  user_id: number;
  title: string | null;
  file_url: string;
  extracted_text: string | null;
  uploaded_at: string;
}

interface AiCoverLetterState {
  aiCoverLetters: CoverLetter[];
  loading: boolean;
  error: string | null;
}

const initialState: AiCoverLetterState = {
  aiCoverLetters: [],
  loading: false,
  error: null,
};

// Async thunk for generating cover letter for a specific job
export const generateCoverLetterForJob = createAsyncThunk<
  CoverLetter,
  number,
  { rejectValue: string }
>(
  'aiCoverLetters/generateForJob',
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/ai_cover_letter/generate/job/${jobId}`);
      return res.data.cover_letter as CoverLetter;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to generate cover letter');
    }
  }
);

// Async thunk for generating cover letter from user profile
export const generateCoverLetterFromProfile = createAsyncThunk<
  CoverLetter,
  void,
  { rejectValue: string }
>(
  'aiCoverLetters/generateFromProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/ai_cover_letter/generate/profile`);
      return res.data.cover_letter as CoverLetter;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to generate cover letter');
    }
  }
);

const aiCoverLetterSlice = createSlice({
  name: 'aiCoverLetters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateCoverLetterForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateCoverLetterForJob.fulfilled, (state, action: PayloadAction<CoverLetter>) => {
        state.aiCoverLetters.push(action.payload);
        state.loading = false;
      })
      .addCase(generateCoverLetterForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })
      .addCase(generateCoverLetterFromProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateCoverLetterFromProfile.fulfilled, (state, action: PayloadAction<CoverLetter>) => {
        state.aiCoverLetters.push(action.payload);
        state.loading = false;
      })
      .addCase(generateCoverLetterFromProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default aiCoverLetterSlice.reducer;
