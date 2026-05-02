// src/app/error.jsx — global error boundary
"use client";
import { useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";

export default function Error({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <p className="font-display text-8xl text-clay-100 font-bold mb-4">!</p>
        <h2 className="font-display text-2xl font-semibold text-clay-800 mb-3">Something went wrong</h2>
        <p className="text-gray-400 text-sm mb-8">{error?.message || "An unexpected error occurred."}</p>
        <button
          onClick={reset}
          className="flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-white font-semibold px-6 py-2.5 rounded-xl mx-auto transition-colors text-sm"
        >
          <FiRefreshCw size={14}/> Try Again
        </button>
      </div>
    </div>
  );
}
