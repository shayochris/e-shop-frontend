import { Fragment } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNavigation from "@/components/other/TopNavigation";
import StoreProvider from "@/providers/StoreProvider";
import AuthInitializer from "@/providers/AuthInitializer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "eshop",
  description: "ecommerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-custom`}
      >
        <StoreProvider>
          <Fragment>
            <AuthInitializer />
            <header className="header">
              <TopNavigation />
            </header>
            <main className="main py-8">{children}</main>
          </Fragment>
        </StoreProvider>
      </body>
    </html>
  );
}
