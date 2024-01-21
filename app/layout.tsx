import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "../lib/utils";
import AuthButton from "@/components/AuthButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

import MainNav from "../components/MainNav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "quizlet, but it's free",
  description: "the most inexpensive way to learn from flashcards",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 max-w-screen-2xl items-center px-8">
              <div className="w-[13%]">
                <Link href="/">
                  <i>q</i>
                </Link>
              </div>
              <MainNav />
              <div className="flex ml-auto">
                <div className="mr-4">
                  <AuthButton />
                </div>
                <ModeToggle />
              </div>
            </div>
          </header>
          <div className="w-full flex flex-col items-center">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
