"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPosts, savePosts } from "../data/postsStore";
import type { Post } from "../data/postsStore";

export default function Feeds() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.summary.toLowerCase().includes(term)
    );
  });

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      title: newTitle,
      date: new Date().toISOString().split("T")[0],
      author: newAuthor,
      summary: newSummary,
      content: newContent,
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setNewTitle("");
    setNewAuthor("");
    setNewSummary("");
    setNewContent("");
    setShowForm(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Feeds / Announcements</h2>

      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search posts"
        className="border rounded-lg p-2 w-full max-w-md mb-4"
      />

      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-6 mb-6 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors block"
      >
        {showForm ? "Cancel" : "+ New Announcement"}
      </button>

      {showForm && (
        <form
          onSubmit={handleAddPost}
          className="border rounded-lg p-4 mb-6 flex flex-col gap-3 bg-gray-50"
        >
          <label className="flex flex-col gap-1">
            Title
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              className="border rounded p-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            Posted by
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              required
              placeholder="e.g. Dr. Smith"
              className="border rounded p-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            Summary
            <input
              type="text"
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              required
              className="border rounded p-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            Full content
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
              rows={4}
              className="border rounded p-2"
            />
          </label>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors self-start"
          >
            Publish Announcement
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {filteredPosts.length === 0 && (
          <p className="text-gray-500">No posts match your search.</p>
        )}

        {filteredPosts.map((post) => {
          const isExpanded = expandedId === post.id;
          return (
            <div
              key={post.id}
              className="border-2 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-blue-500 hover:bg-blue-50 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {post.date} · Posted by {post.author}
              </p>
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