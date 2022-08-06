import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "./TokenSlice";

export default configureStore({
  reducer: {
    Tokens: TokenSlice,
  },
});
