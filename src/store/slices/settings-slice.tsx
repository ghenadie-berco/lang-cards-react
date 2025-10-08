// Redux
import { createSlice } from "@reduxjs/toolkit";
// Interfaces
import { LangCardsSettings } from "../../Interfaces";
// Utilities
import { getSettings } from "../../utilites/localStorage";

export interface SettingsState {
  settings: LangCardsSettings;
}

const initialState: SettingsState = {
  settings: getSettings(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: { payload: LangCardsSettings }) => {
      state.settings = action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;
