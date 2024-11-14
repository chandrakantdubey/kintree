import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    activeContact: null,
    contacts: [
      {
        id: 1,
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: 2,
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      },
      {
        id: 3,
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
    ],
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setActiveContact: (state, action) => {
      state.activeContact = action.payload;
    },
  },
});

export const { sendMessage, setActiveContact } = chatSlice.actions;
export default chatSlice.reducer;
