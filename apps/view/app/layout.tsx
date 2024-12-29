import type { Metadata } from "next";
import { JetBrains_Mono } from 'next/font/google'
import "./globals.css";

const jetbrains = JetBrains_Mono({
  weight: ['100', '200', '300', '400', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "asterisk",
  description: "asterisk gallery, just an space on the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}