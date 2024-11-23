"use client";

import React from "react";
import { Briefcase, Palette } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme(theme === "vibrant" ? "corporate" : "vibrant")}>
        {theme === "vibrant" ? (
          <Palette className="h-[1.2rem] w-[1.2rem] text-ring" />
        ) : (
          <Briefcase className="h-[1.2rem] w-[1.2rem] text-ring" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}
