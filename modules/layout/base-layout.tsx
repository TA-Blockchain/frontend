import { useUser } from "@/hooks/use-user";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return <React.Fragment>{pathname === "/login" ? children : <AuthLoader>{children}</AuthLoader>}</React.Fragment>;
}

function AuthLoader({ children }: { children: React.ReactNode }) {
  const { state } = useUser();

  const router = useRouter();

  if (state === "unauthenticated") {
    router.replace("/login");
  }

  return (
    <div className="container mx-auto py-4">
      {state === "loading" && <PageLoader />}
      {state === "authenticated" && children}
    </div>
  );
}

function PageLoader() {
  return <div>Loading...</div>;
}
