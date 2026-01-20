import React, { useEffect, useState } from "react";
import api from "../api";
import type { Profile as ProfileType, Checklist } from "../types";
import ChecklistManager from "../components/ChecklistManager";
import LogoutButton from "../components/LogoutButton";
import CreateChecklistForm from "../components/CreateChecklistForm";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to handle the update when a new list is created
  const handleChecklistCreated = (newChecklist: Checklist) => {
    // Add the new checklist to the TOP of the list
    setChecklists((prev) => [newChecklist, ...prev]);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, checklistsRes] = await Promise.all([
          api.get("/api/user-profile/"),
          api.get("/api/checklists/"),
        ]);

        setProfile(profileRes.data);
        setChecklists(checklistsRes.data);
      } catch (err) {
        console.error("Failed to load profile data", err);
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
        {/* Profile Header Card */}
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
                {profile?.user.username}
              </h1>
              <p className="text-gray-500">
                {profile?.bio || "Ready for a new adventure!"}
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <LogoutButton />
          </div>
        </div>

        {/* Checklists Section */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            My Travel Checklists
          </h2>

          {/* Create Checklist Form Area */}
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
                <ChecklistManager key={checklist.id} checklist={checklist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
