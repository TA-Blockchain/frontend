import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <Link href="/login">Login</Link>
    </main>
  );
}

HomePage.title = "Dashboard | Carbon Chain";
