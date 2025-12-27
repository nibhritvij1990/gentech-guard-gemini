import type { Metadata } from "next";
import { Montserrat, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const roboto = Roboto_Condensed({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Gentech Guard® | Future of Automotive Protection",
  description: "Next-generation Aliphatic TPU protection. Award-winning PPF, Ceramic Coating, and Sun Film for elite vehicles. Secure your passion with India's fastest-growing armor brand.",
  keywords: ["PPF India", "Automotive Protection", "TPU Film", "Ceramic Coating", "Gentech Guard", "Car Armor"],
  openGraph: {
    title: "Gentech Guard® | Advanced Automotive Protection",
    description: "Secure your passion with India's fastest-growing automotive armor brand.",
    url: "https://gentechguard.com",
    siteName: "Gentech Guard",
    images: [
      {
        url: "/assets/logo-final.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
