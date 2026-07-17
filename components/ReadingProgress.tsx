"use client";

import React, { useEffect, useState } from "react";

type Props = {
  targetId?: string;
};

export default function ReadingProgress({ targetId = "article-content" }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
  function update() {
    const el = document.getElementById(targetId);

    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const articleTop = scrollTop + rect.top;
    const articleHeight = el.scrollHeight;
    const winHeight = window.innerHeight;

    const maxScroll = articleTop + articleHeight - winHeight;
    let pct = 0;

    if (maxScroll <= articleTop) {
      pct = scrollTop >= articleTop ? 100 : 0;
    } else {
      pct = ((scrollTop - articleTop) / (maxScroll - articleTop)) * 100;
    }

    pct = Math.min(100, Math.max(0, pct));
    setProgress(Math.round(pct));
  }

  update();

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}, [targetId]);

  return (
    <div className="reading-progress" aria-hidden>
      <div className="reading-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
