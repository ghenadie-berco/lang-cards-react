// Redux
import { configureStore } from "@reduxjs/toolkit";
// Slices
import { cardsSlice } from "./slices/cards-slice";
import { settingsSlice } from "./slices/settings-slice";

const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

export default store;
