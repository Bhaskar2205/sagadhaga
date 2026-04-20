import "./globals.css";
import { ReactNode } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Script from "next/script"
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <SmoothScroll>
          {children}
        </SmoothScroll>
<Script id="tidio-chat" strategy="afterInteractive">
  {`
    (function() {
      if (typeof window !== "undefined") {
        var script = document.createElement("script");
        script.src = "https://code.tidio.co/w8civs8ci2vwf7psvjotbvkj84uxtjiy.js";
        script.async = true;
        document.body.appendChild(script);
      }
    })();
  `}
</Script>
      </body>
    </html>
  );
}