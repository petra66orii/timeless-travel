import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "../api";
import { toast } from "react-hot-toast";

const PasswordResetConfirm: React.FC = () => {
  const { uid, token } = useParams(); // Grab params from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    if (!uid || !token) {
      setError("Invalid or expired link. Please request a new reset.");
      setLoading(false);
      return;
    }

    try {
      await confirmPasswordReset({
        uid,
        token,
        new_password1: password,
        new_password2: confirmPass,
      });
      toast.success("Password reset successful! You can now log in.");
      navigate("/login");
    } catch {
      setError("Invalid or expired link. Please request a new reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Set New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <input
              type="password"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm p-3 border"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm p-3 border"
              placeholder="Confirm New Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
