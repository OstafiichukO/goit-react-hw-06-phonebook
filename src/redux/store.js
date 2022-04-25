import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

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

export const store = configureStore({
  reducer: {
    contacts: reducerContacts,
  },
});
