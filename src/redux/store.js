import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

export const addContact = createAction("contacts/addContact");
export const removeContact = createAction("contacts/removeContact");
export const handlerFilter = createAction("contacts/handleFilter");

const reducerContacts = createReducer(
  {
    items: [],
    filter: "",
  },
  {
    [addContact]: (state, action) => void state.items.push(action.payload),
    [removeContact]: (state, action) => {
      const contactsList = state.items.filter(
        (item) => item.id !== action.payload
      );
      state.items = contactsList;
    },
    [handlerFilter]: (state, action) => void (state.filter = action.payload),
  }
);

const persistContactsConfig = {
  key: "items",
  storage,
  whitelist: ["items"],
};

const store = configureStore({
  reducer: {
    contacts: persistReducer(persistContactsConfig, reducerContacts),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };
