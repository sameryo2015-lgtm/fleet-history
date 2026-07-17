import { getPosts } from "@/lib/posts";
import SearchableArticleList from "@/components/SearchableArticleList";

export default function ArticlesPage() {
  const posts = getPosts();
  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h1>研究ノート</h1>

      <p
        style={{
          color: "#666",
          marginBottom: "24px",
        }}
      >
        Fleet Historyに収録されている研究ノート一覧です。
      </p>

      <SearchableArticleList posts={posts} />
    </main>
  );
}