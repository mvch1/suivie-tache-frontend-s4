import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Variable } from "lucide-react";
import { Toaster } from "sonner";
import { SessionProvider } from "./session.context";
import { ThemeProvider } from "@/components/theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Projet",
  description: "projet web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute="class"                
            defaultTheme="system"           
            enableSystem={true}
            disableTransitionOnChange={true}
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
