import { getPost, getPosts } from "@/lib/posts";
import { extractHeadings } from "@/lib/markdown";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import "@/app/markdown.css";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleNavigation from "@/components/ArticleNavigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    return null;
  }

  const post = getPost(slug);
  console.log("[ArticlePage] post", post);
  const headings = extractHeadings(post.content);

  const posts = getPosts();
  const currentIndex = posts.findIndex((item) => item.slug === slug);
  const previous = currentIndex > 0 ? posts[currentIndex - 1] : undefined;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined;

  return (
    <main className="page-container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
      <ReadingProgress targetId="article-content" />
      <div className="article-layout">
        <aside className="toc-column">
          <TableOfContents headings={headings} />
        </aside>

        <div className="content-column">
          <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "12px" }}>
            {post.title}
          </h1>

          <p style={{ color: "#666", marginTop: "8px" }}>
            {post.date} ・ {post.country} ・ {post.type}
          </p>

          <Image
            src={`/images/${post.image}`}
            alt={post.title}
            width={900}
            height={500}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "12px",
              marginBottom: "24px",
            }}
          />

          <article id="article-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          <ArticleNavigation previous={previous} next={next} />
        </div>
      </div>
    </main>
  );
}