// redux/features/onboarding/onboardingSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface OnboardingState {
  currentStep: number;
}

const initialState: OnboardingState = {
  currentStep: 1,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    resetOnboarding: () => initialState, // ✅ this line
  },
});
export const { setCurrentStep ,resetOnboarding} = onboardingSlice.actions;
export default onboardingSlice.reducer;
