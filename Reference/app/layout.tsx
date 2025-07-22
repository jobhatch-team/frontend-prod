import type { Metadata } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo2",
  subsets: ["latin"],
  weight: ["800"],
});

export const metadata: Metadata = {
  title: "JobHatch - Hatch your career. Together.",
  description: "Level up your career quest! 🐣 Team up, unlock daily wins, and hatch your dream job—no more solo grinding.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body
        className={`${inter.variable} ${baloo2.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
