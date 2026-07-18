import Link from "next/link";
import { samplePosts } from "../data/posts";

export default function Feeds() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Feeds</h2>
      <div className="grid gap-4">
        {samplePosts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">{post.date}</p>
            <p className="mt-2">{post.summary}</p>
            <Link href={`/feeds/${post.id}`} className="text-blue-600 mt-2 inline-block">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}