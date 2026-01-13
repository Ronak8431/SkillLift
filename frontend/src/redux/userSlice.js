import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    colleges: [],
    loading: false,
    error: null,
  },
  reducers: {
    setColleges: (state, action) => {
      state.colleges = action.payload;
      state.loading = false;
    },
    setUserLoading: (state) => {
      state.loading = true;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setColleges,
  setUserLoading,
  setUserError,
} = userSlice.actions;

export default userSlice.reducer;
