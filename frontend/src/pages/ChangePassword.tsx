import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.new_password1 !== formData.new_password2) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await changePassword(formData);
      alert("Password changed successfully!");
      navigate("/profile");
    } catch (err: unknown) {
      console.error(err);
      // Try to get a readable error message from Django/API
      let msg = "Failed to change password.";
      if (typeof err === "object" && err !== null) {
        const maybe = err as { response?: { data?: Record<string, unknown> } };
        const data = maybe.response?.data;
        if (data) {
          const oldField = data["old_password"];
          const new1Field = data["new_password1"];
          const old =
            Array.isArray(oldField) && typeof oldField[0] === "string"
              ? (oldField[0] as string)
              : null;
          const np1 =
            Array.isArray(new1Field) && typeof new1Field[0] === "string"
              ? (new1Field[0] as string)
              : null;
          msg = old || np1 || msg;
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Change Password
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              name="old_password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={formData.old_password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="new_password1"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={formData.new_password1}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              name="new_password2"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={formData.new_password2}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
