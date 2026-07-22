"use client"; // Needs state and interactivity (search, forms), so must run in the browser

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPosts, savePosts } from "../data/postsStore";
import type { Post } from "../data/postsStore";

export default function Feeds() {
  // Holds the full list of posts (loaded from localStorage or sample data)
  const [posts, setPosts] = useState<Post[]>([]);

  // Tracks which single post (by id) is currently expanded via "Show more"
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Holds whatever the user has typed into the search bar
  const [searchTerm, setSearchTerm] = useState("");

  // Whether the "create new announcement" form is currently visible
  const [showForm, setShowForm] = useState(false);

  // Form field values for creating a new post
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");

  // Load posts once when the page first loads (from localStorage, via getAllPosts)
  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  // Expands or collapses a specific post's full content
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filters posts based on the search bar text, checking both title and summary.
  // This recalculates automatically every time "posts" or "searchTerm" changes.
  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.summary.toLowerCase().includes(term)
    );
  });

  // Runs when the "create new post" form is submitted
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault(); // Stops the page from doing a full reload on form submit

    // Build the new post object.
    // The id is set to one higher than the current highest id, so it's always unique.
    const newPost: Post = {
      id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      title: newTitle,
      date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
      author: newAuthor,
      summary: newSummary,
      content: newContent,
    };

    // Add the new post to the top of the list
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts); // Update what's shown on screen
    savePosts(updatedPosts); // Save to localStorage so it persists after refresh

    // Clear the form fields and hide the form again
    setNewTitle("");
    setNewAuthor("");
    setNewSummary("");
    setNewContent("");
    setShowForm(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Feeds / Announcements</h2>

      {/* Live search bar - filters the list as the user types */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search posts"
        className="border rounded-lg p-2 w-full max-w-md mb-4"
      />

      {/* Toggles the create-post form open/closed */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-6 mb-6 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors block"
      >
        {showForm ? "Cancel" : "+ New Announcement"}
      </button>

      {/* Create post form - only rendered when showForm is true */}
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
              placeholder="e.g. Admin"
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

      {/* Post cards - rendered from filteredPosts, so the search bar affects what's shown here */}
      <div className="grid gap-4">
        {filteredPosts.length === 0 && (
          <p className="text-gray-500">No posts match your search.</p>
        )}

        {filteredPosts.map((post) => {
          const isExpanded = expandedId === post.id;
          return (
            <div
              key={post.id}
              // Hover effects: shadow grows, border turns blue, background tints, card lifts slightly
              className="border-2 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-blue-500 hover:bg-blue-50 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {post.date} · Posted by {post.author}
              </p>
              <p className="mt-2">{post.summary}</p>

              {/* Full content only shows when this post is expanded - the hide/show behaviour */}
              {isExpanded && (
                <p className="mt-2 text-gray-700">{post.content}</p>
              )}

              <div className="flex flex-wrap gap-4 mt-2">
                <button
                  onClick={() => toggleExpand(post.id)}
                  aria-expanded={isExpanded} // Tells screen readers if content is currently shown
                  className="text-blue-600 underline"
                >
                  {isExpanded ? "Show less ▲" : "Show more ▼"}
                </button>
                {/* Links to this post's own dedicated page, using its id in the URL */}
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