"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white p-4 relative">
      <div className="flex justify-between items-center">
        {/* Full nav links - desktop only */}
        <div className="hidden sm:flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/feeds">Feeds</Link>
          <Link href="/settings">Settings</Link>
        </div>

        {/* Animated hamburger icon - mobile only */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown menu with slide animation */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 mt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/feeds" onClick={() => setIsOpen(false)}>Feeds</Link>
          <Link href="/settings" onClick={() => setIsOpen(false)}>Settings</Link>
        </div>
      </div>
    </nav>
  );
}