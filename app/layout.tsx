import "./globals.css";
import { ReactNode } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

        {/* PAGE CONTENT (spacing fix added) */}
        <main className="pt-28 md:pt-32">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </main>

        {/* TIDIO CHAT (robust injection for production) */}
        <Script id="tidio-chat" strategy="afterInteractive">
          {`
            (function() {
              if (typeof window !== "undefined") {
                var script = document.createElement("script");
                script.src = "https://code.tidio.co/yd5d43zdyvthd1ibbaxezulfdgztpek7.js";
                script.async = true;
                document.body.appendChild(script);
              }
            })();
          `}
        </Script>

        {/* VERCEL ANALYTICS */}
        <Analytics />

        {/* VERCEL SPEED INSIGHTS */}
        <SpeedInsights />

      </body>
    </html>
  );
}