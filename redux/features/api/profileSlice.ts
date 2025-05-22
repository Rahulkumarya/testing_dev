

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    completed: false,
    loading: false,
  },
  reducers: {
    setProfileStatus: (state, action) => {
      state.completed = action.payload;
    },
  },
});

export const { setProfileStatus } = profileSlice.actions;
export default profileSlice.reducer;
