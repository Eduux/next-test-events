import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events",
  description: "Create, edit, delete and view events",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} bg-slate-600 text-white p-4 mx-auto sm:max-w-[540px] md:max-w-[720px]`}
      >
        <Header />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
