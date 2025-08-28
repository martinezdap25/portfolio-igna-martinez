import '../globals.css';
import { ReactNode } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import ClientAppWrapper from '@/components/theme/ClientAppWrapper';
import { ThemeProvider } from 'next-themes';
import { ProjectsProvider } from "@/context/ProjectsContext";
import type { Metadata } from 'next';

interface Props {
  children: ReactNode;
  params: Promise<{ lang: 'en' | 'es' }>; // en Next 15 params es Promise
}

// ✅ Metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return {
    title: {
      default: dict.titles.home,
      template: `%s | Ignacio Martinez Portfolio`,
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ProjectsProvider lang={lang}>
          <ThemeProvider attribute="class">
            <ClientAppWrapper dict={dict}>{children}</ClientAppWrapper>
          </ThemeProvider>
        </ProjectsProvider>
      </body>
    </html>
  );
}