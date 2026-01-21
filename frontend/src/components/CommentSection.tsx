import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getComments, createComment } from "../api"; // Import createComment
import type { Comment } from "../types";
import { useAuth } from "../context/AuthContext"; // Import Auth

interface CommentSectionProps {
  postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { isAuthenticated } = useAuth(); // Check if logged in
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // New state for the form input
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments(postId);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to load comments", err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      // Send to API
      const res = await createComment({ post: postId, content: newComment });

      // Optimistic Update: Add the new comment returned from API to the top of the list
      setComments((prev) => [res.data, ...prev]);

      // Clear input
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
      alert("Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="py-4 text-gray-500">Loading comments...</div>;

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Comments ({comments.length})
      </h3>

      {/* --- NEW: Comment Form --- */}
      <div className="mb-8">
        {isAuthenticated ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 focus:ring-purple-500 border"
              rows={3}
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:bg-purple-300"
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">
              Please{" "}
              <Link
                to="/login"
                className="text-purple-600 font-bold hover:underline"
              >
                log in
              </Link>{" "}
              to join the conversation.
            </p>
          </div>
        )}
      </div>

      {/* List Comments */}
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-purple-700">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
