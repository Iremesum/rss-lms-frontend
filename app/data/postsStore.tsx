import { samplePosts } from "./posts";

export type Post = {
  id: number;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string;
};

const STORAGE_KEY = "lms_posts";

export function getAllPosts(): Post[] {
  if (typeof window === "undefined") return samplePosts;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return samplePosts;
}

export function savePosts(posts: Post[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}