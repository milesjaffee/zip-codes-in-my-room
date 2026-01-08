import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zipcodes on things in my room",
  description: "zipcodes on things in my room, by miles jaffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
            <script
              dangerouslySetInnerHTML={{
              __html: `
              const updateKofiWidget = (locale) => {
              kofiWidgetOverlay.draw('milesjaffee', {
                type: 'floating-chat',
                'floating-chat.donateButton.text': 'Support Me',
                'floating-chat.donateButton.background-color': '#bbfc',
                'floating-chat.donateButton.text-color': '#000'
              });
              };

              // Initial setup
              updateKofiWidget('en');
              `,
              }}
            ></script>
      </body>
    </html>
  );
}
