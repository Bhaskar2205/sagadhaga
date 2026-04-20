import "./globals.css";
import { ReactNode } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="pt-28 md:pt-32">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </main>

        {/* TIDIO CHAT */}
        <Script
          src="//code.tidio.co/w8civs8ci2vwf7psvjotbvkj84uxtjiy.js"
          strategy="afterInteractive"
        />

      </body>
    </html>
  );
}