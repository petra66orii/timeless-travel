import { useState, useEffect } from "react";
import { getChecklists } from "../api";
import type { Checklist } from "../types";
import ChecklistManager from "../components/ChecklistManager";
import CreateChecklistForm from "../components/CreateChecklistForm";

export default function Checklists() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChecklists();
        setChecklists(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Please log in to view your checklists.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreate = (newChecklist: Checklist) => {
    // Add new checklist to the TOP of the list
    setChecklists((prev) => [newChecklist, ...prev]);
  };

  const handleDelete = (id: number) => {
    setChecklists((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdate = (updated: Checklist) => {
    setChecklists((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c)),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-body text-pastel-dark">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          My Travel Plans
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your trips and packing lists.
        </p>

        {/* 1. Add the Create Form Here */}
        <div className="mb-8">
          <CreateChecklistForm onChecklistCreated={handleCreate} />
        </div>

        {loading && (
          <div className="text-center p-4">Loading your lists...</div>
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* 2. The List of Checklists */}
        <div className="space-y-8">
          {checklists.map((list) => (
            <ChecklistManager
              key={list.id}
              checklist={list}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}

          {!loading && checklists.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              No checklists found. Create one above to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
