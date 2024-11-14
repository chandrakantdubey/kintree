import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/postSlice";

function CreatePost() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const newPost = {
      id: Date.now(),
      content,
      image: imagePreview,
      author: {
        id: user.id,
        name: user.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
      },
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
    };

    dispatch(addPost(newPost));
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-4">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
            alt="User avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-purple"
              rows="3"
            />

            {imagePreview && (
              <div className="relative mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-60 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="flex items-center gap-2 text-gray-600 hover:text-purple">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Add Photo</span>
              </div>
            </label>
          </div>
          <button
            type="submit"
            disabled={!content.trim() && !image}
            className="bg-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
