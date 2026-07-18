"use client";

import { useState } from "react";
import Link from "next/link";
import { samplePosts } from "../data/posts";

export default function Feeds() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Feeds</h2>
      <div className="grid gap-4">
        {samplePosts.map((post) => {
          const isExpanded = expandedId === post.id;
          return (
            <div key={post.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.date}</p>
              <p className="mt-2">{post.summary}</p>

              {isExpanded && (
                <p className="mt-2 text-gray-700">{post.content}</p>
              )}

              <div className="flex flex-wrap gap-4 mt-2">
                <button
                  onClick={() => toggleExpand(post.id)}
                  aria-expanded={isExpanded}
                  className="text-blue-600 underline"
                >
                  {isExpanded ? "Show less ▲" : "Show more ▼"}
                </button>
                <Link href={`/feeds/${post.id}`} className="text-blue-600">
                  Full page →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}