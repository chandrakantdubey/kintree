import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, addComment } from "../../store/postSlice";

function Post({ post }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    dispatch(likePost({ postId: post.id, userId: user.id }));
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      content: comment,
      author: {
        id: user.id,
        name: user.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
      },
      createdAt: new Date().toISOString(),
    };

    dispatch(addComment({ postId: post.id, comment: newComment }));
    setComment("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-start gap-3 mb-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{post.author.name}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="mb-4">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="rounded-lg mb-4 max-h-96 w-full object-cover"
        />
      )}

      <div className="flex items-center gap-4 mb-4 border-t border-b py-2">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 ${
            post.likes?.includes(user.id) ? "text-purple" : "text-gray-600"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill={post.likes?.includes(user.id) ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{post.likes?.length || 0}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-gray-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="space-y-4">
          {post.comments?.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-sm">
                    {comment.author.name}
                  </h4>
                  <p className="text-sm">{comment.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}

          <form onSubmit={handleComment} className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-2 border rounded-md"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="bg-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
