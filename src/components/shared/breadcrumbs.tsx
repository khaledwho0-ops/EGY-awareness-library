"use client";

import Link from "next/link";

/**
 * BREADCRUMBS — Q64/Q65/Q66
 * 
 * - Uses schema.org BreadcrumbList structured data (Q65)
 * - aria-current="page" on last item (Q66)
 * - Uses existing .breadcrumbs CSS class from globals.css L1647-1671
 * - Last item is not a link — it's the current page
 */

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-md)" }}>
      {/* Schema.org structured data for SEO (Q65) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              ...(item.href ? { item: item.href } : {}),
            })),
          }),
        }}
      />
      <ol className="breadcrumbs">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i}>
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link
                  href={item.href || "/"}
                  style={{
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
