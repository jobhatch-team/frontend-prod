import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../../config/api';

export interface Job {
  id: number;
  title: string;
  description: string;
  work_experience: string;
  skills: string;
  location: string;
  accept_relocate: boolean;
  offer_relocate_assistance: boolean;
  offer_visa_sponsorship: boolean;
  is_remote: boolean;
  currency: string;
  salary_min: number;
  salary_max: number;
  equity_min: number;
  equity_max: number;
  job_type: string;
  company_id: number;
  posted_by: number;
  status?: string;
}

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: Record<string, string> | null;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  status: 'idle',
  errors: null,
};

// === Thunks ===

// Create
export const thunkCreateJob = createAsyncThunk<
  Job,
  Partial<Job>,
  { rejectValue: Record<string, string> }
>('jobs/create', async (jobData, { rejectWithValue }) => {
  const response = await fetch(API_ENDPOINTS.jobs, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(jobData),
  });
  if (response.ok) {
    return await response.json();
  }
  const data = await response.json();
  return rejectWithValue(data);
});

// Get all jobs
export const thunkFetchJobs = createAsyncThunk<Job[]>(
  'jobs/fetchAll',
  async () => {
    const response = await fetch(API_ENDPOINTS.jobs);
    const data = await response.json();
    return data.jobs;
  }
);

// Get one job
export const thunkFetchJob = createAsyncThunk<Job, number>(
  'jobs/fetchOne',
  async (id) => {
    const response = await fetch(`${API_ENDPOINTS.jobs}/${id}`);
    return await response.json();
  }
);

// Update
export const thunkUpdateJob = createAsyncThunk<
  Job,
  { id: number; updates: Partial<Job> },
  { rejectValue: Record<string, string> }
>('jobs/update', async ({ id, updates }, { rejectWithValue }) => {
  const response = await fetch(`${API_ENDPOINTS.jobs}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(updates),
  });
  if (response.ok) {
    return await response.json();
  }
  const data = await response.json();
  return rejectWithValue(data);
});

// Delete
export const thunkDeleteJob = createAsyncThunk<number, number>(
  'jobs/delete',
  async (id) => {
    await fetch(`${API_ENDPOINTS.jobs}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return id;
  }
);

// === Slice ===
const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobErrors(state) {
      state.errors = null;
    },
    clearSelectedJob(state) {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(thunkCreateJob.pending, (state) => {
        state.status = 'loading';
        state.errors = null;
      })
      .addCase(thunkCreateJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs.push(action.payload);
      })
      .addCase(thunkCreateJob.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload ?? { server: 'Job creation failed' };
      })

      // Fetch all
      .addCase(thunkFetchJobs.pending, (state) => {
        state.status = 'loading';
        state.errors = null;
      })
      .addCase(thunkFetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(thunkFetchJobs.rejected, (state) => {
        state.status = 'failed';
      })

      // Fetch one
      .addCase(thunkFetchJob.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
      })

      // Update
      .addCase(thunkUpdateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((job) => job.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
        state.selectedJob = action.payload;
      })
      .addCase(thunkUpdateJob.rejected, (state, action) => {
        state.errors = action.payload ?? { server: 'Job update failed' };
      })

      // Delete
      .addCase(thunkDeleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
        if (state.selectedJob?.id === action.payload) {
          state.selectedJob = null;
        }
      });
  },
});

export const { clearJobErrors, clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
