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
    [addContact]: (state, { payload }) => {
      void state.items.push(payload);
    },
    [removeContact]: (state, { payload }) => {
      const contactsList = state.items.filter(({ id }) => id !== payload);
      state.items = contactsList;
    },
    [handlerFilter]: (state, { payload }) => void (state.filter = payload),
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
