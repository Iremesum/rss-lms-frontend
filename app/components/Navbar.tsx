import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/feeds">Feeds</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  );
}