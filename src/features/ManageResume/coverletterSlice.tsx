
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface CoverLetter {
  id: number;
  user_id: number;
  title: string | null;
  file_url: string;
  uploaded_at: string;
}

interface CoverLetterState {
  userCoverLetters: CoverLetter[];
  loading: boolean;
  error: string | null;
}

const initialState: CoverLetterState = {
  userCoverLetters: [],
  loading: false,
  error: null,
};

export const fetchUserCoverLetters = createAsyncThunk(
  'coverLetters/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/cover_letters');
      return res.data.cover_letters as CoverLetter[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch cover letters');
    }
  }
);

export const uploadCoverLetter = createAsyncThunk(
  'coverLetters/upload',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/cover_letters', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.cover_letter as CoverLetter;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Upload failed');
    }
  }
);

export const updateCoverLetter = createAsyncThunk(
  'coverLetters/update',
  async (
    { coverLetterId, formData }: { coverLetterId: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`/api/cover_letters/${coverLetterId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.cover_letter as CoverLetter;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Update failed');
    }
  }
);

export const deleteCoverLetter = createAsyncThunk(
  'coverLetters/delete',
  async (coverLetterId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/cover_letters/${coverLetterId}`);
      return coverLetterId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Delete failed');
    }
  }
);

const coverLetterSlice = createSlice({
  name: 'coverLetters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCoverLetters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCoverLetters.fulfilled, (state, action) => {
        state.userCoverLetters = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCoverLetters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadCoverLetter.fulfilled, (state, action) => {
        state.userCoverLetters.push(action.payload);
      })
      .addCase(updateCoverLetter.fulfilled, (state, action) => {
        const index = state.userCoverLetters.findIndex(cl => cl.id === action.payload.id);
        if (index !== -1) {
          state.userCoverLetters[index] = action.payload;
        }
      })
      .addCase(deleteCoverLetter.fulfilled, (state, action) => {
        state.userCoverLetters = state.userCoverLetters.filter(cl => cl.id !== action.payload);
      });
  },
});

export default coverLetterSlice.reducer;