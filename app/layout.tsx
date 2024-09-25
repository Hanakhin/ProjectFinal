import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {cn} from "@/lib/utils";
import {Tomorrow} from "next/font/google"

import {Provider} from "@/app/provider";
import {ToastContainer} from "react-toastify";
import {CartProvider} from "@/app/contexts/CartContext";

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
      <CartProvider>
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
      </CartProvider>
    </Provider>
    </html>
  );
}
