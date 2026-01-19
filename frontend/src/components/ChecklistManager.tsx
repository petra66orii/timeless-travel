import { useState } from "react";
import type { Checklist, Task } from "../types";
import { toggleTask } from "../api";

interface Props {
  checklist: Checklist;
}

export default function ChecklistManager({ checklist }: Props) {
  // We keep a local copy of tasks so we can mutate them instantly
  const [tasks, setTasks] = useState<Task[]>(checklist.tasks);

  const handleToggle = async (task: Task) => {
    // 1. Calculate the new status
    const newStatus = !task.completed;

    // 2. OPTIMISTIC UPDATE: Update UI immediately
    const previousTasks = [...tasks]; // Save backup
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, completed: newStatus } : t)),
    );

    // 3. Send to Backend
    try {
      await toggleTask(task.id, newStatus);
      console.log(`Synced task ${task.id} to server.`);
    } catch (error) {
      // 4. ROLLBACK: If server fails, revert UI
      console.error("Sync failed, reverting:", error);
      setTasks(previousTasks);
      alert("Could not save task. Please check your connection.");
    }
  };

  // Calculate progress
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = Math.round((completedCount / tasks.length) * 100) || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-xl font-bold text-gray-900">{checklist.title}</h3>
        <p className="text-gray-500 text-sm mb-4">{checklist.description}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">
          {progress}% Complete
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 flex items-center gap-4 transition-colors duration-200 ${
              task.completed ? "bg-gray-50" : "hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task)}
              className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer"
            />
            <span
              className={`grow cursor-pointer select-none ${
                task.completed
                  ? "text-gray-400 line-through decoration-2"
                  : "text-gray-700"
              }`}
              onClick={() => handleToggle(task)} // Allow clicking text too
            >
              {task.task}
            </span>

            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${
                task.priority === "high"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
