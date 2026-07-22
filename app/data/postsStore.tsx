// Handles reading and writing posts to localStorage.
// Since there's no backend yet, this simulates persistent storage in the browser.
// Both the Feeds list page and individual post pages use these same functions,
// so they always read/write the same shared data.

import { samplePosts } from "./posts";

export type Post = {
  id: number;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string;
};

const STORAGE_KEY = "lms_posts"; // The key used to store posts in localStorage

// Returns all posts - either what's saved in localStorage,
// or the original sample posts if nothing has been saved yet.
export function getAllPosts(): Post[] {
  // "typeof window === 'undefined'" checks if this is running on the server
  // (localStorage only exists in the browser, not on the server)
  if (typeof window === "undefined") return samplePosts;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored); // Convert the saved text back into a real array of posts
  }
  return samplePosts;
}

// Saves the full list of posts to localStorage.
// Called whenever a post is created, edited, or deleted.
export function savePosts(posts: Post[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); // Convert the array into text to store it
}