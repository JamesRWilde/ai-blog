import Footer from "@/app/_components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";

export const metadata: Metadata = {
  title: `Next.js Blog Example with ${CMS_NAME}`,
  description: `A statically generated blog example using Next.js and ${CMS_NAME}.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Crano:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,900&display=swap');
          :root {
            --font-headings: 'Crano', sans-serif;
            --font-body: 'EB Garamond', serif;
          }
          body {
            font-family: var(--font-body);
            font-feature-settings: 'liga', 'kern';
          }
          h1, h2, h3, h4, h5, h6, p, li, span, a {
            font-family: var(--font-headings);
          }
        `}</style>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className="dark:bg-slate-950 dark:text-slate-200"
      >
        <ThemeSwitcher />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
