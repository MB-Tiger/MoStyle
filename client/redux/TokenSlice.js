import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

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
    deleteAdminToken: (state, action) => {
      const newAt = "";
      return { at: newAt };
    },
    addUserToken: (state, action) => {
      const oldUt = JSON.parse(JSON.stringify(state.ut));
      oldUt = action.payload;
      return { ut: oldUt };
    },
    deleteUserToken: (state, action) => {
      const newUt = ""
      return { ut: newUt };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.myTokens,
      };
    },
  }
});

export const { addAdminToken, deleteAdminToken, addUserToken, deleteUserToken } = TokenSlice.actions;

export default TokenSlice.reducer;
