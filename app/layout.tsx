import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DreamPrompter - Turn Dreams into Actions",
  description: "Transform your weird dreams into real-world actionable tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}