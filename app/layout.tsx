import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MongoDB & Mongoose Mastery",
  description: "3-day intensive Arabic course for MongoDB and Mongoose"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
