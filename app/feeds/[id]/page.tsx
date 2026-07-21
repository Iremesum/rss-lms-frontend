"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, notFound } from "next/navigation";
import { getAllPosts, savePosts } from "../../data/postsStore";
import type { Post } from "../../data/postsStore";

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const posts = getAllPosts();
    const found = posts.find((p) => p.id === Number(params.id));
    setPost(found || null);
    if (found) {
      setEditTitle(found.title);
      setEditAuthor(found.author || "");
      setEditSummary(found.summary);
      setEditContent(found.content);
    }
  }, [params.id]);

  if (post === undefined) {
    return <div className="p-8">Loading...</div>;
  }

  if (post === null) {
    notFound();
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const allPosts = getAllPosts();
    const updatedPosts = allPosts.map((p) =>
      p.id === post.id
        ? {
            ...p,
            title: editTitle,
            author: editAuthor,
            summary: editSummary,
            content: editContent,
          }
        : p
    );
    savePosts(updatedPosts);
    setPost({
      ...post,
      title: editTitle,
      author: editAuthor,
      summary: editSummary,
      content: editContent,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this announcement?");
    if (!confirmed) return;

    const allPosts = getAllPosts();
    const updatedPosts = allPosts.filter((p) => p.id !== post.id);
    savePosts(updatedPosts);
    router.push("/feeds");
  };

  return (
    <div className="p-8">
      <Link href="/feeds" className="text-blue-600 mb-4 inline-block">
        ← Back to Feeds
      </Link>

      {!isEditing ? (
        <>
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {post.date} · Posted by {post.author}
          </p>
          <p className="mb-4">{post.content}</p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Edit Announcement
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Delete Announcement
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSave} className="flex flex-col gap-3 max-w-xl">
          <label className="flex flex-col gap-1">
            Title
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
              className="border rounded p-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            Posted by
            <input
              type="text"
              value={editAuthor}
              onChange={(e) => setEditAuthor(e.target.value)}
              required
              className="border rounded p-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            Summary
            <input
              type="text"
              value={editSummary}
              onChange={(e) => setEditSummary(e.target.value)}
              required
              className="border rounded p-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            Full content
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              required
              rows={4}
              className="border rounded p-2"
            />
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}