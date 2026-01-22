import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChecklists, deleteChecklist } from "../api";
import type { Checklist } from "../types";
import { toast } from "react-hot-toast";

const ChecklistList: React.FC = () => {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch checklists on load
  useEffect(() => {
    fetchChecklists();
  }, []);

  const fetchChecklists = async () => {
    try {
      const res = await getChecklists();
      setChecklists(res);
    } catch (err) {
      console.error("Failed to fetch checklists", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this checklist?"))
      return;
    try {
      await deleteChecklist(id);
      // Remove from state immediately
      setChecklists(checklists.filter((c) => c.id !== id));
    } catch {
      toast.error("Failed to delete checklist.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen font-body text-pastel-dark">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold">Your Travel Planner</h1>
        <Link
          to="/checklists/new"
          className="bg-action-create text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
        >
          + New Checklist
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading your plans...</div>
      ) : checklists.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-lg text-gray-600 mb-4">
            You haven't created any checklists yet.
          </p>
          <Link
            to="/checklists/new"
            className="text-action-info font-bold hover:underline"
          >
            Start planning your first trip!
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {checklists.map((checklist) => (
            <div
              key={checklist.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition flex justify-between items-center"
            >
              <Link
                to={`/checklists/${checklist.id}`}
                className="block flex-1 group"
              >
                <h2 className="text-xl font-bold group-hover:text-action-info transition">
                  {checklist.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Created on{" "}
                  {new Date(checklist.created_at).toLocaleDateString()}
                </p>
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  to={`/checklists/${checklist.id}/edit`}
                  className="text-action-edit font-medium hover:text-orange-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(checklist.id)}
                  className="text-action-delete font-medium hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChecklistList;
