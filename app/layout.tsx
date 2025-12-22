import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Second Brain | AI Knowledge Assistant",
  description: "Transform your scattered notes into a structured knowledge engine. Our AI understands your context and surfaces insights instantly.",
  metadataBase: new URL('https://my-personal-vault.vercel.app/'), 
  openGraph: {
    title: "Second Brain | AI Knowledge Assistant",
    description: "Transform your scattered notes into a structured knowledge engine.",
    url: 'https://my-personal-vault.vercel.app', 
    siteName: 'Second Brain',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Second Brain | AI Knowledge Assistant",
    description: "Transform your scattered notes into a structured knowledge engine.",
  },
  authors: [{ name: "Aditya Trivedi" }],
  keywords: ["Second Brain", "AI", "Knowledge Management", "RAG", "Productivity"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500/30`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

