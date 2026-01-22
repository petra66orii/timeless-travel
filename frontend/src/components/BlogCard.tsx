import React from "react";
import { Link } from "react-router-dom"; // Import Link
import type { BlogPost } from "../types";

interface Props {
  post: BlogPost;
}

const BlogCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      {/* Image Link */}
      <Link
        to={`/blog/${post.id}`}
        className="h-48 overflow-hidden bg-gray-200"
      >
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center text-xs text-gray-500">
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span className="font-medium text-blue-600">{post.author.name}</span>
        </div>

        {/* Title Link */}
        <Link to={`/blog/${post.id}`} className="block">
          <h3 className="mb-3 text-xl font-bold text-gray-900 hover:text-blue-600">
            {post.title}
          </h3>
        </Link>

        <p className="mb-4 flex-1 text-base text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto">
          <Link
            to={`/blog/${post.id}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            Read full article →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
