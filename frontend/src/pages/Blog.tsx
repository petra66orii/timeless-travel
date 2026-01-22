import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api";
import type { BlogPost } from "../types";

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. ADD: State for the search query
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(res);
      } catch (err) {
        setError("Failed to load posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // 2. ADD: Filtering Logic (Filters by Title OR Author)
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query)
    );
  });

  if (loading)
    return <div className="text-center p-10 font-body">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-10 text-red-500 font-body">{error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-body text-pastel-dark">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4 text-gray-900">
          Travel Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Read stories from fellow travelers or share your own adventures.
        </p>

        {/* 3. ADD: Search Bar Input */}
        <div className="mt-8 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search posts by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-action-info focus:border-transparent outline-none transition"
          />
          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 4. UPDATE: Render 'filteredPosts' instead of 'posts' */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden bg-gray-200">
                <img
                  src={
                    post.featured_image || "https://via.placeholder.com/400x300"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-sm text-action-info font-bold mb-2 uppercase tracking-wide">
                  {post.author.name}
                </div>
                <h2 className="text-xl font-bold mb-2 font-heading text-gray-900">
                  <Link
                    to={`/blog/${post.id}`}
                    className="hover:text-action-info transition"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-action-info font-bold hover:underline"
                  >
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* 5. ADD: Fallback if no search results found */
          <div className="col-span-full text-center py-12 text-gray-500">
            No posts found matching "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
