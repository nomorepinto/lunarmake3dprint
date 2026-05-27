import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const inter = localFont({
  src: "../public/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
});

const hankenGrotesk = localFont({
  src: "../public/fonts/HankenGrotesk-VariableFont_wght.ttf",
  variable: "--font-hanken-grotesk",
});

const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-jetbrains-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${inter.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col bg-background text-on-background`}
    >
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
