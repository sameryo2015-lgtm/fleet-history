import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        padding: "20px 40px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>Fleet History</h1>

      <nav
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link href="/">ホーム</Link>
        <Link href="/articles">研究ノート</Link>
      </nav>
    </header>
  );
}