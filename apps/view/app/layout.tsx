import type { Metadata } from "next";
import { JetBrains_Mono } from 'next/font/google'
import "./globals.css";

const jetbrains = JetBrains_Mono({
  weight: ['100', '200', '300', '400', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "0x00",
  description: "✱ gallery, just a creator's space on the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.className} antialiased h-screen w-screen md:p-3`}
      >
        {children}
      </body>
    </html>
  );
}