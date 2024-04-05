import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Inter } from "next/font/google";
import BaseLayout from "@/modules/layout/base-layout";
import { api } from "@/lib";

import { SWRConfig } from "swr";
import { Seo } from "@/components/seo";
import { Toaster } from "sonner";
import { useUser } from "@/hooks/use-user";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const theme = process.env.NODE_ENV === "production" ? "light" : "dark";

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: { title: string };
}) {
  return (
    <ThemeProvider defaultTheme={theme} enableSystem={false} attribute="class">
      <Seo title={Component.title} />
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <div>
        <SWRConfig
          value={{
            fetcher: (url) => {
              if (url.includes("undefined")) return undefined;
              return api.get(url).then((res) => res.data);
            },
          }}
        >
          <Toaster richColors position="bottom-right" />
          <BaseLayout>
            <PageLoader />
            <Component {...pageProps} />
          </BaseLayout>
        </SWRConfig>
      </div>
    </ThemeProvider>
  );
}

function PageLoader() {
  const { state } = useUser();
  const [showLoader, setShowLoader] = React.useState(true);

  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (state !== "loading") {
      timeoutRef.current = setTimeout(() => {
        setShowLoader(false);
      }, 150);
    }
  }, [state]);

  if (!showLoader) return null;

  return <div className="fixed z-[99] inset-0 w-screen h-dvh bg-white"></div>;
}
