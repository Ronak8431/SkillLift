import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: null,   
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setAllApplicants,
  setLoading,
  setError,
} = applicationSlice.actions;

export default applicationSlice.reducer;
