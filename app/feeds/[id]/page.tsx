import Link from "next/link";
import { samplePosts } from "../../data/posts";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = samplePosts.find((p) => p.id === Number(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="p-8">
      <Link href="/feeds" className="text-blue-600 mb-4 inline-block">
        ← Back to Feeds
      </Link>
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{post.date}</p>
      <p>{post.content}</p>
    </div>
  );
}