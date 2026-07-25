"use client"; // Needs the theme toggle button, which requires interactivity

import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  // Get the current theme and the function to switch it, shared from ThemeContext
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="mb-4">Current theme: {theme}</p>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-[#A6192E] text-white hover:bg-[#7d1220]"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}