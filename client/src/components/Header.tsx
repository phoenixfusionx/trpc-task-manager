import React from "react";
import { CheckSquare, Sparkles } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">TaskFlow</h1>
              <p className="text-sm text-slate-600">
                Manage your tasks with ease
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Built with tRPC</span>
          </div>
        </div>
      </div>
    </header>
  );
};
