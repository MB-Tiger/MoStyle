import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  at: "",
  ut: "",
};

const TokenSlice = createSlice({
  name: "myTokens",
  initialState,
  reducers: {
    addAdminToken: (state, action) => {
      const oldAt = JSON.parse(JSON.stringify(state.at));
      oldAt = action.payload;
      return { at: oldAt };
    },
    addUserToken: (state, action) => {
      const oldUt = JSON.parse(JSON.stringify(state.ut));
      oldUt = action.payload;
      return { ut: oldUt };
    },
  },
});

export const { addAdminToken, addUserToken } = TokenSlice.actions;

export default TokenSlice.reducer;
