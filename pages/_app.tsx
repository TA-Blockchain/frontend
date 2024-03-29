import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Inter } from "next/font/google";
import { ThemeSwitch } from "@/modules/misc/theme-toggle";
import BaseLayout from "@/modules/layout/base-layout";
import { api } from "@/lib";

import { SWRConfig } from "swr";
import { Seo } from "@/components/seo";

const inter = Inter({ subsets: ["latin"] });

const theme = process.env.NODE_ENV === "production" ? "light" : "dark";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme={theme} enableSystem={false} attribute="class">
      <Seo />
      <div className={inter.className}>
        <SWRConfig
          value={{
            fetcher: (url) => {
              if (url.includes("undefined")) return undefined;
              return api.get(url).then((res) => res.data);
            },
          }}
        >
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </SWRConfig>
        <ThemeSwitch />
      </div>
    </ThemeProvider>
  );
}
