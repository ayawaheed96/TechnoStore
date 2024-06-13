import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "../../store/Store";
import Layout from "@/components/Layouts/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechnoStore",
  description: "Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Layout children={children}/>
        </StoreProvider>
      </body>
    </html>
  );
}
