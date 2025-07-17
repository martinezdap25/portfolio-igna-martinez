import "../globals.css";
import { ReactNode } from "react";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getDictionary } from "@/app/[lang]/dictionaries";
import BitsBackgroundCanvas from "@/components/BitsBackgroundCanvas";
import Footer from "@/components/footer/Footer";
import IntroScreen from "@/components/theme/IntroScreen";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <IntroScreen dict={dict}/>
            <Header lang={lang} dict={dict} />
            <BitsBackgroundCanvas/>
            {children}
            <Footer dictionary={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
