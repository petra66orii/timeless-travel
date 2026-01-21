import React, { useState } from "react";
import { requestPasswordReset } from "../api";
import { Link } from "react-router-dom";

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await requestPasswordReset(email);
      setMessage(
        "If an account exists with this email, you will receive a reset link shortly.",
      );
    } catch {
      setError("Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Reset Password
        </h2>

        {message ? (
          <div className="bg-green-50 text-green-700 p-4 rounded mb-4 text-center">
            {message}
            <div className="mt-4">
              <Link
                to="/login"
                className="text-purple-600 font-bold hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-purple-500 focus:border-purple-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none disabled:bg-purple-300"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordResetRequest;
