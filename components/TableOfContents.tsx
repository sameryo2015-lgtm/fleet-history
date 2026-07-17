"use client";

import React, { useEffect, useRef, useState } from "react";
import type { HeadingItem } from "@/lib/markdown";

type Props = {
  headings: HeadingItem[];
};

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-40% 0px -55% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });
    obsRef.current = observer;

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      obsRef.current = null;
    };
  }, [headings]);

    if (!headings || headings.length === 0) return null;

    // If the URL already contains a hash, scroll to it on mount
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // small timeout to ensure layout/hydration
        setTimeout(() => el.scrollIntoView({ behavior: "auto", block: "start" }), 50);
        setActiveId(id);
      }
    }

    return (
    <nav className="toc">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="toc-title">📚 目次</h3>
        <button
          onClick={() => setCollapsed((s) => !s)}
          aria-expanded={!collapsed}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          {collapsed ? "開く" : "閉じる"}
        </button>
      </div>

      {!collapsed && (
        <ul className="toc-list">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li
                key={heading.id}
                className={`toc-item ${heading.level === 3 ? "toc-sub" : ""} ${
                  isActive ? "active" : ""
                }`}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(heading.id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    // reflect in history so refresh preserves position
                    if (typeof history !== "undefined") {
                      history.pushState(null, "", `#${heading.id}`);
                    }
                  }}
                  className={`toc-link ${isActive ? "active" : ""}`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}