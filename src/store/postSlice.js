import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // Simulate API call
  return [];
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.items.unshift(action.payload);
    },
    likePost: (state, action) => {
      const post = state.items.find(
        (post) => post.id === action.payload.postId,
      );
      if (post) {
        post.likes = post.likes || [];
        const userLikeIndex = post.likes.indexOf(action.payload.userId);
        if (userLikeIndex === -1) {
          post.likes.push(action.payload.userId);
        } else {
          post.likes.splice(userLikeIndex, 1);
        }
      }
    },
    addComment: (state, action) => {
      const post = state.items.find(
        (post) => post.id === action.payload.postId,
      );
      if (post) {
        post.comments = post.comments || [];
        post.comments.push(action.payload.comment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addPost, likePost, addComment } = postSlice.actions;
export default postSlice.reducer;
