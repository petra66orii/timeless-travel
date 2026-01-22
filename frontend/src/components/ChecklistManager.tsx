import React, { useState } from "react";
import type { Checklist, Task } from "../types";
import {
  updateTask,
  createTask,
  deleteTask,
  deleteChecklist,
  updateChecklist,
} from "../api";
import { toast } from "react-hot-toast";

// 1. Update Interface to accept the new props
interface Props {
  checklist: Checklist;
  onDelete: (id: number) => void;
  onUpdate: (checklist: Checklist) => void;
}

export default function ChecklistManager({
  checklist,
  onDelete,
  onUpdate,
}: Props) {
  const [tasks, setTasks] = useState<Task[]>(checklist.tasks);

  // Task State
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  // Checklist Editing State
  const [isEditingList, setIsEditingList] = useState(false);
  const [listTitle, setListTitle] = useState(checklist.title);
  const [listDesc, setListDesc] = useState(checklist.description);

  // --- Checklist Actions ---

  const handleDeleteChecklist = async () => {
    if (
      !window.confirm("Are you sure you want to delete this entire checklist?")
    )
      return;
    try {
      await deleteChecklist(checklist.id);
      onDelete(checklist.id); // Notify parent
    } catch {
      toast.error("Failed to delete checklist");
    }
  };

  const handleSaveList = async () => {
    try {
      const response = await updateChecklist(checklist.id, {
        title: listTitle,
        description: listDesc,
      });
      setIsEditingList(false);
      onUpdate({ ...checklist, ...response.data }); // Notify parent
    } catch {
      toast.error("Failed to update checklist");
    }
  };

  // --- Task Actions ---

  const handleUpdateTask = async (taskId: number, updates: Partial<Task>) => {
    const previousTasks = [...tasks];
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)));
    try {
      await updateTask(taskId, updates);
    } catch {
      setTasks(previousTasks);
    }
  };

  const cyclePriority = (task: Task) => {
    const next: Record<string, "low" | "medium" | "high"> = {
      low: "medium",
      medium: "high",
      high: "low",
    };
    handleUpdateTask(task.id, { priority: next[task.priority] });
  };

  const saveTaskEdit = async () => {
    if (!editingTaskId || !editTaskTitle.trim()) return;
    await handleUpdateTask(editingTaskId, { task: editTaskTitle });
    setEditingTaskId(null);
    setEditTaskTitle("");
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const tempId = Date.now();
    const optimistic: Task = {
      id: tempId,
      task: newTaskTitle,
      completed: false,
      priority: "low",
    };
    setTasks([...tasks, optimistic]);
    setNewTaskTitle("");
    setIsAdding(true);
    try {
      const res = await createTask(checklist.id, newTaskTitle);
      setTasks((curr) => curr.map((t) => (t.id === tempId ? res.data : t)));
    } catch {
      setTasks((curr) => curr.filter((t) => t.id !== tempId));
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!window.confirm("Delete task?")) return;
    const prev = [...tasks];
    setTasks(tasks.filter((t) => t.id !== taskId));
    try {
      await deleteTask(taskId);
    } catch {
      setTasks(prev);
    }
  };

  // Progress Calculation
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 transition-all hover:shadow-md">
      {/* --- Header Section --- */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        {isEditingList ? (
          // Edit Mode
          <div className="space-y-3">
            <input
              type="text"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              className="w-full font-bold text-xl px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              value={listDesc}
              onChange={(e) => setListDesc(e.target.value)}
              className="w-full text-sm px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              rows={2}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsEditingList(false)}
                className="text-xs px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveList}
                className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 group">
                {checklist.title}
                <button
                  onClick={() => setIsEditingList(true)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition-opacity"
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
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {checklist.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {tasks.length} items
              </span>
              <button
                onClick={handleDeleteChecklist}
                className="text-gray-300 hover:text-red-500 transition-colors"
                title="Delete Checklist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
        )}

        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${progress === 100 ? "bg-green-500" : "bg-blue-600"}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* --- Task List --- */}
      <div className="divide-y divide-gray-100">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3 grow">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  handleUpdateTask(task.id, { completed: !task.completed })
                }
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />

              {editingTaskId === task.id ? (
                <div className="flex items-center gap-2 grow">
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:border-blue-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveTaskEdit();
                    }}
                  />
                  <button
                    onClick={saveTaskEdit}
                    className="text-green-600 hover:text-green-700"
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <span
                  onClick={() =>
                    handleUpdateTask(task.id, { completed: !task.completed })
                  }
                  className={`cursor-pointer select-none transition-all ${task.completed ? "text-gray-400 line-through" : "text-gray-700"}`}
                >
                  {task.task}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => cyclePriority(task)}
                className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider transition-colors cursor-pointer hover:opacity-80 ${task.priority === "high" ? "bg-red-100 text-red-600" : task.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}
              >
                {task.priority}
              </button>
              <button
                onClick={() => {
                  setEditingTaskId(task.id);
                  setEditTaskTitle(task.task);
                }}
                className="text-gray-400 hover:text-blue-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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

      {/* --- Add Task Input --- */}
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
