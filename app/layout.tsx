import "./globals.css";
import { ReactNode } from "react";
import SmoothScroll from "./components/SmoothScroll";
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

      </body>
    </html>
  );
}