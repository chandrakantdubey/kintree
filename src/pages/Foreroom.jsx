import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";
import CreatePost from "../components/foreroom/createPost";
import Post from "../components/foreroom/post";
import UserProfile from "../components/foreroom/userProfile";
import FamilyInfo from "../components/foreroom/familyInfo";

function Foreroom() {
  const dispatch = useDispatch();
  const { items: posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-6">
          {/* Left Column - User Profile
              Shows above 768px, takes 3 columns
          */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3">
            <div className="sticky top-6">
              <UserProfile />
            </div>
          </aside>

          {/* Center Column - Posts
              - Full width on mobile
              - 9 cols (768px to 1024px)
              - 6 cols (above 1024px)
          */}
          <main className="w-full md:col-span-8 lg:col-span-6">
            <CreatePost />
            {loading ? (
              <div className="text-center py-4">Loading posts...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-4">
                Error: {error}
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            )}
          </main>

          {/* Right Column - Family Info
              Shows above 1024px, takes 3 columns
          */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="h-[calc(100vh-2rem)] overflow-y-auto">
              <FamilyInfo />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Foreroom;
