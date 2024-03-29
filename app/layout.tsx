import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/main.css"
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metamask-wallet",
  description: "Generated by create next app",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?=v=4"],
    shortcut: ["/android-chrome-512x512.png"]
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <main className="container"> */}
        {children}
        {/* </main> */}
      </body>
    </html>
  );
}
