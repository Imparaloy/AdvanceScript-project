import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adv Script Shop",
  description: "Cart and order confirmation pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={prompt.className} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
