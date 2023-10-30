import { inter } from "./ui/fonts";
import { Metadata } from "next";

import "./ui/global.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://nextjs-dashboard-4ndrs.vercel.app"),
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className} antialiased`}>{children}</body>
  </html>
);

export default RootLayout;
