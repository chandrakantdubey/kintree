import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    id: "1",
    name: "John Doe",
    gender: "male",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    dateOfBirth: "1990-01-01",
  },
  members: [
    {
      id: "2",
      name: "Mary Doe",
      gender: "female",
      pids: ["1"], // partner/spouse ID
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
      dateOfBirth: "1991-02-15",
      relationshipType: "Spouse",
    },
    {
      id: "3",
      name: "Robert Doe",
      gender: "male",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      dateOfBirth: "1965-06-20",
      children: ["1"], // points to current user
      relationshipType: "Father",
    },
    {
      id: "4",
      name: "Sarah Doe",
      gender: "female",
      pids: ["3"], // partner ID (Father)
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      dateOfBirth: "1968-03-12",
      children: ["1"], // points to current user
      relationshipType: "Mother",
    },
  ],
  loading: false,
  error: null,
};

const familyTreeSlice = createSlice({
  name: "familyTree",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    addMember: (state, action) => {
      state.members.push(action.payload);
    },
    updateMember: (state, action) => {
      const index = state.members.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setMembers, addMember, updateMember, setCurrentUser } =
  familyTreeSlice.actions;
export default familyTreeSlice.reducer;
