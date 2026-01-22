import React, { useState } from "react";
import type { Comment } from "../types";
import { useAuth } from "../context/AuthContext";
import { updateComment, deleteComment } from "../api";
import { toast } from "react-hot-toast";

interface CommentItemProps {
  comment: Comment;
  onDelete: (id: number) => void; // Callback to remove from parent list
  onUpdate: (updated: Comment) => void; // Callback to update parent list
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDelete,
  onUpdate,
}) => {
  const { user } = useAuth(); // Get current user
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [saving, setSaving] = useState(false);

  // Check if the current user owns this comment
  // Note: user?.username comes from AuthContext, comment.author comes from API
  const isOwner = user?.user.id === comment.author.id;

  const handleSave = async () => {
    if (!editContent.trim()) return;
    setSaving(true);
    try {
      const res = await updateComment(comment.id, editContent);
      onUpdate(res.data); // Update parent state
      setIsEditing(false); // Exit edit mode
    } catch {
      toast.error("Failed to update comment.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteComment(comment.id);
      onDelete(comment.id); // Remove from parent state
    } catch {
      toast.error("Failed to delete comment.");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 transition-colors hover:bg-white">
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold text-purple-700">
          {comment.author.name}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>

          {/* EDIT/DELETE CONTROLS (Only for Owner) */}
          {isOwner && !isEditing && (
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-600 font-medium"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT AREA */}
      {isEditing ? (
        <div>
          <textarea
            className="w-full rounded-md border-gray-300 p-2 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500 border mb-2"
            rows={2}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content); // Reset text
              }}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-purple-600 text-white text-xs px-3 py-1 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap text-sm">
          {comment.content}
        </p>
      )}
    </div>
  );
};

export default CommentItem;
