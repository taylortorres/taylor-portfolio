import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, Source_Serif_4 } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import SiteHeader from "@/components/SiteHeader";
import { INTRO_SCRIPT } from "@/lib/intro";
import { DEFAULT_SHARE_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"], // italic for emphasis in case study callouts
  axes: ["opsz"], // optical size follows the font size, like Figma's Source Serif Pro display cuts
});

// Site-wide defaults. metadataBase makes every relative metadata URL
// (canonical, Open Graph) absolute on taylortorres.me; each page sets its own
// canonical and Open Graph tags (pageMetadata in src/lib/site.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION, images: [DEFAULT_SHARE_IMAGE] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning // the intro script may add class="intro" before hydration
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${sourceSerif.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {/* Before any content: decides the home intro before the first paint (src/lib/intro.ts). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        {/* Outside the page template: mounts once per full load, stays put on navigation. */}
        <SiteHeader>
          <Nav />
        </SiteHeader>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
