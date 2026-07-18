"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((seg) => seg !== "");

  return (
    <nav aria-label="Breadcrumb" className="p-4 text-sm text-gray-600">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        return (
          <span key={href}>
            {" "}
            &gt;{" "}
            <Link href={href} className="hover:underline">
              {label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}