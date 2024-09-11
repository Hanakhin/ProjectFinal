import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {cn} from "@/lib/utils";
import {Tomorrow} from "next/font/google"

import {Provider} from "@/app/provider";
import {ToastContainer} from "react-toastify";

const GeistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  preload:true
});
const GeistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload:true
});

const TomorrowFont = Tomorrow({
    subsets:["latin"],
    variable:"--font-tomorrow",
    weight: "400",
  preload:true
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
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
        />
      </body>
    </Provider>
    </html>
  );
}
