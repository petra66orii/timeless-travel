// frontend/src/pages/PostDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../api";
import type { BlogPost } from "../types";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const response = await getPost(id);
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError("Post not found or could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">Loading article...</div>
    );
  if (error || !post)
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Post not found"}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Featured Image */}
        {post.featured_image && (
          <div className="h-64 w-full overflow-hidden md:h-96">
            <img
              src={post.featured_image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
              {post.title}
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium text-blue-600">{post.author}</span>
              <span className="mx-2">•</span>
              <time>{new Date(post.created_at).toLocaleDateString()}</time>
            </div>
          </div>

          {/* Content (Render HTML safely) */}
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer / Back Button */}
          <div className="mt-12 border-t pt-8">
            <Link
              to="/blog"
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-500"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
