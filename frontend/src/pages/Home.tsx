import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api";
import type { BlogPost } from "../types";

const Home: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await getPosts();
        setLatestPosts(res.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-body text-pastel-dark">
      {/* --- HERO SECTION --- */}
      <div className="relative bg-gray-900 h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Travel Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4 drop-shadow-lg">
            Time[less] Travel
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Discover hidden gems, plan your perfect itinerary, and organize your
            adventures all in one place.
          </p>
          <Link
            to="/blog"
            className="inline-block bg-pastel-purple hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Exploring
          </Link>
        </div>
      </div>

      {/* --- LATEST STORIES --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-pastel-dark">
            Latest Stories
          </h2>
          <p className="mt-2 text-gray-500">Fresh from the blog</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading stories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img
                    src={
                      post.featured_image ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </div>
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm text-action-info font-bold mb-2 uppercase tracking-wider">
                    {post.author.name} •{" "}
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 font-heading">
                    <Link
                      to={`/blog/${post.id}`}
                      className="hover:text-action-info transition"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-action-info font-bold hover:text-blue-700 mt-auto inline-flex items-center"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- NEWSLETTER (Legacy Pastel Theme) --- */}
      <div className="bg-pastel-blue py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-pastel-dark mb-4">
            Join the Adventure
          </h2>
          <p className="text-pastel-dark/80 mb-8 text-lg">
            Get travel tips, exclusive guides, and inspiration delivered
            straight to your inbox.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-action-info focus:border-transparent outline-none"
            />
            <button className="bg-pastel-purple hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md transition transform hover:-translate-y-0.5">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
