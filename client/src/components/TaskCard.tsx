import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import {
  Check,
  Clock,
  Edit,
  Trash2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { TaskForm } from "./TaskForm";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const utils = trpc.useUtils();

  const toggleMutation = trpc.toggleTask.useMutation({
    onSuccess: () => {
      utils.getTasks.invalidate();
    },
  });

  const deleteMutation = trpc.deleteTask.useMutation({
    onSuccess: () => {
      utils.getTasks.invalidate();
    },
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-3 h-3" />;
      case "medium":
        return <Clock className="w-3 h-3" />;
      case "low":
        return <Check className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dueDate: string | null) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !task.completed;
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
          task.completed ? "opacity-75" : ""
        } ${
          isOverdue(task.dueDate)
            ? "border-red-200 bg-red-50"
            : "border-slate-200"
        }`}
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <button
                onClick={() => toggleMutation.mutate({ id: task.id })}
                disabled={toggleMutation.isLoading}
                className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 ${
                  task.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-slate-300 hover:border-green-500"
                }`}
              >
                {task.completed && <Check className="w-3 h-3" />}
              </button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg font-semibold transition-all duration-200 ${
                    task.completed
                      ? "line-through text-slate-500"
                      : "text-slate-800"
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p
                    className={`mt-1 text-sm ${
                      task.completed ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {task.description}
                  </p>
                )}

                <div className="flex items-center space-x-4 mt-3">
                  <div
                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {getPriorityIcon(task.priority)}
                    <span className="capitalize">{task.priority}</span>
                  </div>

                  {task.dueDate && (
                    <div
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                        isOverdue(task.dueDate)
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteMutation.mutate({ id: task.id })}
                disabled={deleteMutation.isLoading}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <TaskForm
          task={task}
          onClose={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      )}
    </>
  );
};
