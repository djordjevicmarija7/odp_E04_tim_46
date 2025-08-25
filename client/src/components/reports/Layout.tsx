import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--nude-50)]">
      <div className="w-full max-w-7xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
}
