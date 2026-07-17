import Link from "next/link";

type PostLink = {
  slug: string;
  title: string;
};

type Props = {
  previous?: PostLink;
  next?: PostLink;
};

export default function ArticleNavigation({ previous, next }: Props) {
  if (!previous && !next) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        justifyContent: "space-between",
        marginTop: "40px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      <div>
        {previous ? (
          <Link
            href={`/articles/${previous.slug}`}
            style={{ color: "#0b1d33", textDecoration: "none" }}
          >
            ← 前の記事: {previous.title}
          </Link>
        ) : (
          <span style={{ color: "#999" }}>前の記事はありません</span>
        )}
      </div>

      <div>
        {next ? (
          <Link
            href={`/articles/${next.slug}`}
            style={{ color: "#0b1d33", textDecoration: "none" }}
          >
            次の記事: {next.title} →
          </Link>
        ) : (
          <span style={{ color: "#999" }}>次の記事はありません</span>
        )}
      </div>
    </div>
  );
}
