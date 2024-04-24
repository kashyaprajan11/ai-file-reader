import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Read your files",
  description: "Read your txt files with the power of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar bg-base-100 flex justify-between">
          <a href="/" className="btn btn-ghost text-xl">
            Read your Files
          </a>
          <div className="flex gap-2">
            <a href="/login" className="btn hover:bg-[rgba(255,255,255,0.1)]">
              Login
            </a>
            <a
              href="/register"
              className="btn hover:bg-[rgba(255,255,255,0.3)]"
            >
              Register
            </a>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
