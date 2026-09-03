import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";
import Sidebar from "@/components/Sidebar";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Analytix Pro — Lumina Analytics Dashboard",
  description:
    "A powerful SaaS analytics dashboard for tracking revenue, traffic, and user metrics in real time.",
  openGraph: {
    title: "Analytix Pro — Lumina Analytics Dashboard",
    description:
      "Track revenue, traffic, and user metrics with Analytix Pro.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="bg-[var(--color-surface)] text-[var(--color-on-surface)] antialiased">
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto bg-[var(--color-surface-container-low)]">
                  {children}
                </main>
              </div>
            </div>
            <LanguageToggle />
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}