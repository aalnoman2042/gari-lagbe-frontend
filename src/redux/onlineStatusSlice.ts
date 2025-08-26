import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnlineStatusState {
  isOnline: boolean;
}

const initialState: OnlineStatusState = {
  isOnline: false,
};

const onlineStatusSlice = createSlice({
  name: "onlineStatus",
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    toggleOnlineStatus: (state) => {
      state.isOnline = !state.isOnline;
    },
  },
});

export const { setOnlineStatus, toggleOnlineStatus } = onlineStatusSlice.actions;
export default onlineStatusSlice.reducer;
