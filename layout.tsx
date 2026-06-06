import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Study With Me",
  description: "Focus. Notes. Progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
