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
        <main >
          <SmoothScroll>
            {children}     
          </SmoothScroll>
        </main>

        {/* TIDIO CHAT */}
        <Script
          src="//code.tidio.co/yd5d43zdyvthd1ibbaxezulfdgztpek7.js"
          strategy="afterInteractive"
        />

      </body>
    </html>
  );
}