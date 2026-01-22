import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { updateUserProfile } from "../api";
import type { Profile } from "../types";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State for fields
  const [profileId, setProfileId] = useState<number | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch the list (filtered by user on backend)
        const res = await api.get<Profile[]>("/api/user-profile/");
        if (res.data.length > 0) {
          const data = res.data[0];
          setProfileId(data.id);
          setFirstName(data.user.first_name);
          setLastName(data.user.last_name);
          setBio(data.bio || "");
          setCurrentImage(data.profile_picture);
        }
      } catch {
        console.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Create a temporary URL for preview
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileId) return;

    setSaving(true);
    const formData = new FormData();

    formData.append("user.first_name", firstName);
    formData.append("user.last_name", lastName);
    formData.append("bio", bio);

    if (selectedFile) {
      formData.append("profile_picture", selectedFile);
    }

    try {
      await updateUserProfile(profileId, formData);
      alert("Profile updated!");
      navigate("/profile");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-sm max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300 mb-3">
              <img
                src={
                  previewUrl ||
                  currentImage ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <label className="cursor-pointer text-sm text-purple-600 font-medium hover:underline">
              Change Photo
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900">Security</h3>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => navigate("/change-password")}
                className="text-purple-600 hover:text-purple-500 text-sm font-medium hover:underline"
              >
                Change your password
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
