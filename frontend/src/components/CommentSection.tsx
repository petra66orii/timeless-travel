/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getComments, createComment } from "../api";
import type { Comment } from "../types";
import { useAuth } from "../context/AuthContext";
import CommentItem from "./CommentItem";
import { toast } from "react-hot-toast";

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
      toast.error("Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to update list when a child is deleted
  const handleCommentDeleted = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  // Helper to update list when a child is edited
  const handleCommentUpdated = (updatedComment: Comment) => {
    setComments((prev) =>
      prev.map((c) => (c.id === updatedComment.id ? updatedComment : c)),
    );
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
          {comments.map((_comment) => (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onDelete={handleCommentDeleted}
                  onUpdate={handleCommentUpdated}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
