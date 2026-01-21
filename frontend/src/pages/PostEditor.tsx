import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, createPost, updatePost } from "../api"; // Use new helpers

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    excerpt: string;
    featured_image: string;
    status: number;
    visibility: "Public" | "Users Only" | "Private";
  }>({
    title: "",
    content: "",
    excerpt: "",
    featured_image: "",
    status: 0, // 0 = Draft, 1 = Published
    visibility: "Public", // Default
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      getPost(id)
        .then((res) => {
          const {
            title,
            content,
            excerpt,
            featured_image,
            status,
            visibility,
          } = res.data;
          setFormData({
            title,
            content,
            excerpt,
            featured_image: featured_image || "",
            status,
            visibility: visibility || "Public",
          });
        })
        .catch(() => alert("Failed to load post."));
    }
  }, [id, isEditing]);

  if (isEditing && loading) {
    return <div className="text-center p-10">Loading post details...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await updatePost(id, formData);
        alert("Post updated!");
        navigate(`/blog/${id}`);
      } else {
        const res = await createPost(formData);
        alert("Post created!");
        navigate(`/blog/${res.data.id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          {isEditing ? "Edit Post" : "Write New Story"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL (Optional)
            </label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              placeholder="https://example.com/image.jpg"
              value={formData.featured_image}
              onChange={(e) =>
                setFormData({ ...formData, featured_image: e.target.value })
              }
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content (HTML or Text)
            </label>
            <textarea
              required
              rows={8}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Excerpt
            </label>
            <textarea
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
            />
          </div>

          {/* Status & Visibility (Grid) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: Number(e.target.value) })
                }
              >
                <option value={0}>Draft</option>
                <option value={1}>Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Visibility
              </label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                value={formData.visibility}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    visibility: e.target.value as
                      | "Public"
                      | "Users Only"
                      | "Private",
                  })
                }
              >
                <option value="Public">Public</option>
                <option value="Users Only">Users Only</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
            >
              {loading ? "Saving..." : "Save Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
