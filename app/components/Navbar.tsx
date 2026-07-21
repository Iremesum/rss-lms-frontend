"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses =
  "px-3 py-1 rounded transition-colors duration-200 hover:bg-blue-700 hover:text-white";

  return (
    <nav className="bg-blue-500 text-white p-4 relative">
      <div className="flex justify-between items-center">
        <div className="hidden sm:flex gap-4">
          <Link href="/" className={linkClasses}>Home</Link>
          <Link href="/about" className={linkClasses}>About</Link>
          <Link href="/feeds" className={linkClasses}>Feeds</Link>
          <Link href="/settings" className={linkClasses}>Settings</Link>
        </div>

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

      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 mt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <Link href="/" className={linkClasses} onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className={linkClasses} onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/feeds" className={linkClasses} onClick={() => setIsOpen(false)}>Feeds</Link>
          <Link href="/settings" className={linkClasses} onClick={() => setIsOpen(false)}>Settings</Link>
        </div>
      </div>
    </nav>
  );
}