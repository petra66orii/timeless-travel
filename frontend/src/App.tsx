import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import PostEditor from "./pages/PostEditor";

function App() {
  // 2. Get auth state
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              {/* Brand Logo */}
              <div className="flex shrink-0 items-center">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  Timeless Travel
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                >
                  Home
                </Link>

                <Link
                  to="/blog"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                >
                  Blog
                </Link>

                {/* 3. Conditional Rendering */}
                {isAuthenticated ? (
                  // If Logged In: Show Profile
                  <Link
                    to="/profile"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-blue-600 border-b-2 border-transparent hover:border-blue-300"
                  >
                    My Profile
                  </Link>
                ) : (
                  // If Logged Out: Show Login
                  <Link
                    to="/login"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/new" element={<PostEditor />} />
        <Route path="/blog/:id/edit" element={<PostEditor />} />
        <Route path="/blog/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
