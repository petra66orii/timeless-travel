import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import PostEditor from "./pages/PostEditor";
import Register from "./pages/Register";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Checklists from "./pages/Checklists";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checklists" element={<Checklists />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/new" element={<PostEditor />} />
        <Route path="/blog/:id/edit" element={<PostEditor />} />
        <Route path="/blog/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordResetRequest />} />
        <Route
          path="/password-reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
