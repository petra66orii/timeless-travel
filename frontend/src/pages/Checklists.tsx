import { useState, useEffect } from "react";
import { getChecklists } from "../api";
import type { Checklist } from "../types";
import ChecklistManager from "../components/ChecklistManager";

export default function Checklists() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChecklists();
        setChecklists(data);
      } catch (err) {
        // If 403 (Forbidden), the user probably isn't logged in.
        // For now, we'll just show an error.
        setError("Please log in to view your checklists.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Travel Plans
        </h1>

        {loading && <p>Loading your lists...</p>}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        )}

        <div className="space-y-8">
          {checklists.map((list) => (
            <ChecklistManager key={list.id} checklist={list} />
          ))}
        </div>
      </div>
    </div>
  );
}
