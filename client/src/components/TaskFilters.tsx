import React from "react";
import { Filter } from "lucide-react";

interface TaskFiltersProps {
  filter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  priorityFilter: "all" | "low" | "medium" | "high";
  onPriorityFilterChange: (filter: "all" | "low" | "medium" | "high") => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filter,
  onFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Status
          </label>
          <div className="flex space-x-2">
            {[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "completed", label: "Completed" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange(option.value as any)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  filter === option.value
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Priority
          </label>
          <div className="flex space-x-2">
            {[
              { value: "all", label: "All" },
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onPriorityFilterChange(option.value as any)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  priorityFilter === option.value
                    ? "bg-purple-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
