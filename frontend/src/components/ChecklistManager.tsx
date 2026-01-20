import React, { useState } from "react";
import type { Checklist, Task } from "../types";
import { updateTask, createTask, deleteTask } from "../api"; // Use updateTask

interface Props {
  checklist: Checklist;
}

export default function ChecklistManager({ checklist }: Props) {
  const [tasks, setTasks] = useState<Task[]>(checklist.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // --- NEW: Editing State ---
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // --- 1. Generic Update Handler (Toggle & Priority) ---
  const handleUpdateTask = async (taskId: number, updates: Partial<Task>) => {
    const previousTasks = [...tasks];

    // Optimistic Update
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)));

    try {
      await updateTask(taskId, updates);
    } catch (error) {
      console.error("Update failed, reverting:", error);
      setTasks(previousTasks);
    }
  };

  // --- 2. Cycle Priority ---
  const cyclePriority = (task: Task) => {
    const nextPriority: Record<string, "low" | "medium" | "high"> = {
      low: "medium",
      medium: "high",
      high: "low",
    };
    handleUpdateTask(task.id, { priority: nextPriority[task.priority] });
  };

  // --- 3. Start Editing (Rename) ---
  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.task);
  };

  // --- 4. Save Edit ---
  const saveEdit = async () => {
    if (!editingTaskId || !editTitle.trim()) return;

    await handleUpdateTask(editingTaskId, { task: editTitle });
    setEditingTaskId(null);
    setEditTitle("");
  };

  // --- 5. Add Task ---
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const tempId = Date.now();
    const title = newTaskTitle;

    const optimisticTask: Task = {
      id: tempId,
      task: title,
      completed: false,
      priority: "low",
    };

    setTasks([...tasks, optimisticTask]);
    setNewTaskTitle("");
    setIsAdding(true);

    try {
      const response = await createTask(checklist.id, title);
      setTasks((current) =>
        current.map((t) => (t.id === tempId ? response.data : t)),
      );
    } catch (error) {
      console.error("Failed to add task:", error);
      setTasks((current) => current.filter((t) => t.id !== tempId));
      alert("Failed to add task.");
    } finally {
      setIsAdding(false);
    }
  };

  // --- 6. Delete Task ---
  const handleDeleteTask = async (taskId: number) => {
    if (!window.confirm("Delete this task?")) return;
    const previousTasks = [...tasks];
    setTasks(tasks.filter((t) => t.id !== taskId));

    try {
      await deleteTask(taskId);
    } catch {
      setTasks(previousTasks);
    }
  };

  // Calculate progress
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 transition-all hover:shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {checklist.title}
            </h3>
            <p className="text-gray-500 text-sm">{checklist.description}</p>
          </div>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {tasks.length} items
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${progress === 100 ? "bg-green-500" : "bg-blue-600"}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Task List */}
      <div className="divide-y divide-gray-100">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3 grow">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  handleUpdateTask(task.id, { completed: !task.completed })
                }
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />

              {/* Edit Mode vs View Mode */}
              {editingTaskId === task.id ? (
                <div className="flex items-center gap-2 grow">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:border-blue-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") setEditingTaskId(null);
                    }}
                  />
                  <button
                    onClick={saveEdit}
                    className="text-green-600 hover:text-green-700"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <span
                  onClick={() =>
                    handleUpdateTask(task.id, { completed: !task.completed })
                  }
                  className={`cursor-pointer select-none transition-all ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {task.task}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Priority Badge (Clickable) */}
              <button
                onClick={() => cyclePriority(task)}
                className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider transition-colors cursor-pointer hover:opacity-80 ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                }`}
                title="Click to change priority"
              >
                {task.priority}
              </button>

              {/* Edit Button */}
              <button
                onClick={() => startEditing(task)}
                className="text-gray-400 hover:text-blue-600 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                title="Rename Task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Input */}
      <form
        onSubmit={handleAddTask}
        className="p-4 bg-gray-50 border-t border-gray-100"
      >
        <div className="relative">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            disabled={isAdding}
            placeholder="Add a new item..."
            className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm disabled:opacity-50 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!newTaskTitle.trim() || isAdding}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
