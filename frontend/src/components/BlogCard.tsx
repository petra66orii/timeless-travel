import type { BlogPost } from "../types";
import { Link } from "react-router-dom";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Image Section */}
      <div className="h-48 overflow-hidden bg-gray-200">
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col grow">
        <div className="text-sm text-purple-600 font-semibold mb-2 uppercase tracking-wide">
          {post.author} • {post.created_at}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 grow">{post.excerpt}</p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto inline-block text-center w-full py-2 px-4 bg-gray-50 hover:bg-purple-50 text-purple-600 font-medium rounded-lg transition-colors"
        >
          Read Story
        </Link>
      </div>
    </div>
  );
}
