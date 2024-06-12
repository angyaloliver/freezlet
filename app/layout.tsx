import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "../lib/utils";
import AuthButton from "@/components/AuthButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

import MainNav from "../components/MainNav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "freezlet",
  description: "the most inexpensive way to learn from flashcards",
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>❄️</text></svg>",
};

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen font-inter antialiased", fontInter.variable)}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 max-w-screen-2xl items-center px-8">
              <div className="w-[13%]">
                <Link href="/">❄️</Link>
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
          <div className="flex-grow w-full">{children}</div>
          <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                built by{" "}
                <a
                  target="_blank"
                  className="font-medium underline underline-offset-4"
                  href="https://x.com/oliverangyal"
                >
                  oliverangyal
                </a>
                .
              </p>
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
