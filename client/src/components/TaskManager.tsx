import React from "react";
import { trpc } from "../utils/trpc";
import { Plus, Loader2 } from "lucide-react";

export const TaskManager: React.FC = () => {
  const { data: tasks, isLoading, error } = trpc.getTasks.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">Error loading tasks: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Your Tasks</h2>
          <p className="text-slate-600 mt-1">
            {tasks?.length || 0} tasks total,{" "}
            {tasks?.filter((t) => !t.completed).length || 0} active
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
};
