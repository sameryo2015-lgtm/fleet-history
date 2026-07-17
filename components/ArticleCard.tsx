import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  country: string;
  type: string;
  date: string;
  image: string;
  tags?: string[];
};

export default function ArticleCard({
  slug,
  title,
  country,
  type,
  date,
  image,
  tags = [],
}: Props) {
  return (
    <Link
      href={`/articles/${slug}`}
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "24px",
        textDecoration: "none",
        color: "inherit",
        background: "white",
        display: "block",
      }}
    ><Image
  src={`/images/${image}`}
  alt={title}
  width={400}
  height={220}
  style={{
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "16px",
  }}
/>
      <h3>{title}</h3>

      <p>🌍 {country}</p>

      <p>{type}</p>

      {tags.length > 0 && (
        <p style={{ color: "#555", margin: "8px 0 0" }}>
          タグ: {tags.join(" / ")}
        </p>
      )}

      <small>{date}</small>
    </Link>
  );
}