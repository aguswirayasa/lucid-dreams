import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import ToastProvider from "@/providers/ToastProvider";

const jetbrain = JetBrains_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Lucid Dreams",
  description: "Turn your dream anime characters into reality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrain.className} bg-primary text-white `}>
        <QueryProvider>
          <Navbar />
          <ToastProvider />
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
