// Redux
import { createSlice } from "@reduxjs/toolkit";
// Interfaces
import { Card } from "../../Interfaces";
// Utilities
import { getCards } from "../../utilites/localStorage.js";

const initialState = {
  cards: getCards(),
};

export interface LangCardsState {
  cards: Card[];
}

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addNewCard: (state, action: { payload: Card }) => {
      state.cards.push(action.payload);
    },
    updateCard: (state, action: { payload: Card }) => {
      const index = state.cards.findIndex(
        (c: Card) => c.id === action.payload.id
      );
      state.cards[index] = action.payload;
    },
    deleteCard: (state, action: { payload: number }) => {
      state.cards = state.cards.filter((c: Card) => c.id !== action.payload);
    },
    setCards: (state, action: { payload: Card[] }) => {
      state.cards = action.payload;
    },
  },
});

export const { addNewCard, updateCard, deleteCard, setCards } =
  cardsSlice.actions;
