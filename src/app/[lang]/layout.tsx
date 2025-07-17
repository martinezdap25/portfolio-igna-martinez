import "../globals.css";
import { ReactNode } from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ClientAppWrapper from "@/components/theme/ClientAppWrapper";
import { ThemeProvider } from "next-themes";

interface Props {
  children: ReactNode;
  params: Promise<{ lang: "en" | "es" }>; // params es Promise ahora
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
        <ClientAppWrapper dict={dict}>{children}</ClientAppWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}