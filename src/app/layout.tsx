import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { cookies } from "next/headers";
import { K2D } from 'next/font/google'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components


const k2d = K2D({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '700'],
  display: 'swap', // หรือ 'optional' เพื่อลด layout shift
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Taemmarin Taprab | Portfolio",
  description: "เว็บไซต์ Portfolio ของ Taemmarin Taprab",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";

  return (
    <html lang="th" className={`${theme} ${k2d.className}`} suppressHydrationWarning>
      <body>
        <Providers initialTheme={theme}>{children}</Providers>
      </body>
    </html>
  );
}