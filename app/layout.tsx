import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {cn} from "@/lib/utils";
import {Tomorrow} from "next/font/google"

import {Provider} from "@/app/provider";

const GeistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const GeistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const TomorrowFont = Tomorrow({
    subsets:["latin"],
    variable:"--font-tomorrow",
    weight: "400",
});

export const metadata: Metadata = {
  title: "GameZone",
  description: "Achetez vos jeux aux meilleurs prix!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={'h-full'}>
    <Provider>
      <body
        className={ cn(GeistSans.variable,GeistMono.variable,TomorrowFont.variable, 'font-sans h-full bg-background text-foreground')}
      >
        {children}
      </body>
    </Provider>
    </html>
  );
}
