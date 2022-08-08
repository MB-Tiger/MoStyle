import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import TokenSlice from "./TokenSlice";

// const masterReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       myTokens: {
//         at: state.at + action.payload.at,
//         ut: state.ut + action.payload.ut,
//       },
//     };
//     return nextState;
//   } else {
//     return TokenSlice(state, action);
//   }
// };

export const makeStore = () =>
  configureStore({
    reducer: {
      Tokens: TokenSlice,
    },
  });

export const wrapper = createWrapper(makeStore, { debug: true });
