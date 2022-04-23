import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    contacts: [],
  },
  reducers: {
    add(state, action) {
      state.contacts.push(action.payload);
    },
    remove(state, action) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

export const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterName(state, action) {
      return (state = action.payload);
    },
  },
});

const persistConfig = {
  key: "items",
  storage,
};

export const itemsReducer = persistReducer(persistConfig, itemsSlice.reducer);
export const { add, remove } = itemsSlice.actions;
export const { filterName } = filterSlice.actions;
export const getItemsValue = (state) => state.items.contacts;
