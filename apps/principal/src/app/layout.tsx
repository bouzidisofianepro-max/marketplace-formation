import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marketplace Formation — trouvez une formation",
  description:
    "Comparez des formations professionnelles, en centre ou à distance, et repérez celles qui peuvent être financées avec le CPF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={montserrat.className}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
