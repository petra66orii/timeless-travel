import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";

function App() {
  return (
    <Router>
      {/* Temporary Navbar for testing */}
      <nav className="p-4 bg-white shadow-sm flex gap-4 justify-center">
        <Link
          to="/"
          className="text-gray-700 hover:text-purple-600 font-medium"
        >
          Home
        </Link>
        <Link
          to="/blog"
          className="text-gray-700 hover:text-purple-600 font-medium"
        >
          Blog
        </Link>
      </nav>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
