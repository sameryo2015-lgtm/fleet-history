"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";

type Post = {
  slug: string;
  title: string;
  country: string;
  type: string;
  date: string;
  image: string;
  tags: string[];
};

type Props = {
  posts: Post[];
};

export default function SearchableArticleList({ posts }: Props) {
  const [search, setSearch] = useState("");

  const query = search.toLowerCase().trim();
  const filteredPosts = posts.filter((post) => {
    const haystack = [
      post.title,
      post.country,
      post.type,
      post.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  return (
    <>
      <input
        type="text"
        placeholder="🔍 艦名・国・艦種・タグで検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          margin: "20px 0",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredPosts.length === 0 ? (
          <p style={{ color: "#666" }}>該当する記事が見つかりませんでした。</p>
        ) : (
          filteredPosts.map((post) => (
            <ArticleCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              country={post.country}
              type={post.type}
              date={post.date}
              image={post.image}
              tags={post.tags}
            />
          ))
        )}
      </div>
    </>
  );
}