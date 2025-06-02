import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Raphael - YWC20 Hackathon",
    template: `%s | Raphael`,
  },
  description: "Raphael - YWC20 Hackathon",
  keywords: ["Raphael", "YWC20", "Hackathon", "Thailand", "Business", "Technology"],
  authors: [{ name: "Raphael Team" }],
  openGraph: {
    title: "Raphael",
    description: "Raphael - YWC20 Hackathon",
    url: siteUrl,
    siteName: "Raphael",
    images: [
      {
        url: `${siteUrl}/opengraph/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "Raphael Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael",
    description: "Raphael - YWC20 Hackathon",
    images: [`${siteUrl}/opengraph/og-preview.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${kanit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
