import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api";
import type { BlogPost } from "../types";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/CommentSection";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user

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

  const handleDelete = async () => {
    if (!id || !window.confirm("Are you sure you want to delete this post?"))
      return;
    try {
      await deletePost(id);
      alert("Post deleted.");
      navigate("/blog");
    } catch {
      alert("Failed to delete post.");
    }
  };

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

  const isOwner = user?.id === post.author.id;

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
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
                {post.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium text-purple-600">
                  {post.author.name}
                </span>
                <span className="mx-2">•</span>
                <time>{new Date(post.created_at).toLocaleDateString()}</time>
                {post.status === 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-bold">
                    DRAFT
                  </span>
                )}
              </div>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex gap-2">
                <Link
                  to={`/blog/${post.id}/edit`}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 text-sm font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <div className="mt-12 border-t pt-8">
            <Link
              to="/blog"
              className="inline-flex items-center font-medium text-purple-600 hover:text-purple-500"
            >
              ← Back to all posts
            </Link>
          </div>
          <CommentSection postId={post.id} />
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
