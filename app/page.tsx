import { getPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const posts = getPosts();

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <section style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem" }}>Fleet History</h1>

        <p
          style={{
            fontSize: "1.3rem",
            color: "#666",
          }}
        >
          艦艇を入口として歴史を学ぶ
        </p>
      </section>

      <h2>最新の研究ノート</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {posts.map((post) => (
        <ArticleCard
  key={post.slug}
  slug={post.slug}
  title={post.title}
  country={post.country}
  type={post.type}
  date={post.date}
   image={post.image}
/>
        ))}
      </div>
    </main>
  );
}