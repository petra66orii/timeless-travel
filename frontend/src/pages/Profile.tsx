import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { getPosts, deletePost } from "../api";
import type { Profile as ProfileType, Checklist, BlogPost } from "../types";
import ChecklistManager from "../components/ChecklistManager";
import LogoutButton from "../components/LogoutButton";
import CreateChecklistForm from "../components/CreateChecklistForm";
import { toast } from "react-hot-toast";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [myPosts, setMyPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Handle Creation (Existing)
  const handleChecklistCreated = (newChecklist: Checklist) => {
    setChecklists((prev) => [newChecklist, ...prev]);
  };

  // 2. Handle Deletion (New)
  const handleChecklistDeleted = (id: number) => {
    setChecklists((prev) => prev.filter((c) => c.id !== id));
  };

  // 3. Handle Update (New - e.g. Rename)
  const handleChecklistUpdated = (updatedList: Checklist) => {
    setChecklists((prev) =>
      prev.map((c) => (c.id === updatedList.id ? updatedList : c)),
    );
  };

  const handleDeletePost = async (postId: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this story? This cannot be undone.",
      )
    )
      return;

    try {
      await deletePost(postId);
      // Update UI immediately by filtering out the deleted post
      setMyPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete post.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, checklistsRes, postsRes] = await Promise.all([
          api.get("/api/user-profile/"),
          api.get("/api/checklists/"),
          getPosts(), // Fetch all visible posts
        ]);

        setProfile(profileRes.data[0]);
        setChecklists(checklistsRes.data);

        // Filter posts client-side to find ones authored by this user
        // (Since the API returns all published posts + my drafts)
        const userPosts = postsRes.filter(
          (p: BlogPost) => p.author === profileRes.data.user.username,
        );
        setMyPosts(userPosts);
      } catch (err) {
        console.error("Failed to load profile data", err);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading)
    return <div className="text-center p-10">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-between rounded-2xl bg-white p-8 shadow-sm md:flex-row">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-blue-50 bg-gray-200">
              {profile?.profile_picture ? (
                <img
                  src={profile.profile_picture}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  <span className="text-2xl font-bold">
                    {profile?.user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile?.user.first_name} {profile?.user.last_name}
              </h1>
              <p className="text-gray-500">
                {profile?.bio || "Ready for a new adventure!"}
              </p>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <LogoutButton />
            <div className="mt-6">
              <Link
                to="/profile/edit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                ✏️ Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Checklists Section */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            My Travel Checklists
          </h2>

          <div className="mb-8">
            <CreateChecklistForm onChecklistCreated={handleChecklistCreated} />
          </div>

          {checklists.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm">
              <p className="text-gray-500">
                You haven't created any checklists yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {checklists.map((checklist) => (
                <ChecklistManager
                  key={checklist.id}
                  checklist={checklist}
                  // Pass the new handlers down
                  onDelete={handleChecklistDeleted}
                  onUpdate={handleChecklistUpdated}
                />
              ))}
            </div>
          )}
        </div>

        {/* Blog Posts Section */}
        <div className="border-t pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              My Travel Stories
            </h2>
            <Link
              to="/blog/new"
              className="text-sm font-medium text-purple-600 hover:text-purple-500"
            >
              + Write New
            </Link>
          </div>

          {myPosts.length === 0 ? (
            <p className="text-gray-500">
              You haven't written any stories yet.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {myPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center"
                >
                  {/* Left Side: Text Info */}
                  <div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="font-bold text-gray-900 hover:text-purple-600 block"
                    >
                      {post.title}
                    </Link>
                    <div className="text-xs text-gray-500 mt-1 flex gap-2">
                      <span>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      {post.status === 0 && (
                        <span className="text-yellow-600 font-bold bg-yellow-50 px-1 rounded">
                          DRAFT
                        </span>
                      )}
                      {post.visibility === "Private" && (
                        <span className="text-red-600 bg-red-50 px-1 rounded">
                          PRIVATE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Action Buttons Grouped */}
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/blog/${post.id}/edit`}
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
