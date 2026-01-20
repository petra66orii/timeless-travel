import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext"; // Import hook

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout from context

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (!confirmLogout) return;

    try {
      await api.post("/dj-rest-auth/logout/");
    } catch (err) {
      console.warn("Logout failed on server", err);
    } finally {
      // Use Context logout (clears state and localStorage)
      logout();
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
