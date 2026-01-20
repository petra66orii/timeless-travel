import React, { useState } from "react";
import api from "../api";
import type { Checklist } from "../types";

interface Props {
  onChecklistCreated: (newChecklist: Checklist) => void;
}

const CreateChecklistForm: React.FC<Props> = ({ onChecklistCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const response = await api.post("/api/checklists/", {
        title,
        description,
      });
      // Pass the new data back to the parent to update the list immediately
      onChecklistCreated(response.data);

      // Reset form
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    } catch (error) {
      console.error("Failed to create checklist", error);
      alert("Failed to create checklist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 1. Collapsed State (Just a button)
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center text-gray-500 transition-colors hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50"
      >
        <span className="text-xl font-bold mr-2">+</span> Create New Checklist
      </button>
    );
  }

  // 2. Expanded State (The Form)
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border bg-white p-6 shadow-sm transition-all"
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        New Checklist details
      </h3>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder="e.g., Summer Trip to Italy 2026"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder="Notes about weather, dates, or specific activities..."
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
        >
          {loading ? "Creating..." : "Create Checklist"}
        </button>
      </div>
    </form>
  );
};

export default CreateChecklistForm;
