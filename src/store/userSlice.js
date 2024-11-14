// store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/user/profile", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Update profile image
export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (imageFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      const response = await axios.put("/api/user/profile-image", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  profileImage: "",
  bio: "",
  phoneNumber: "",
  address: "",
  dateOfBirth: "",
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile Cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.profileImage = action.payload.profileImage;
        state.bio = action.payload.bio;
        state.phoneNumber = action.payload.phoneNumber;
        state.address = action.payload.address;
        state.dateOfBirth = action.payload.dateOfBirth;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch user profile";
      })

      // Update Profile Cases
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.bio = action.payload.bio;
        state.phoneNumber = action.payload.phoneNumber;
        state.address = action.payload.address;
        state.dateOfBirth = action.payload.dateOfBirth;
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update profile";
        state.success = false;
      })

      // Update Profile Image Cases
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload.profileImage;
        state.success = true;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to update profile image";
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess, resetUser } = userSlice.actions;
export default userSlice.reducer;
