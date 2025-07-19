import '../globals.css';
import { ReactNode } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import ClientAppWrapper from '@/components/theme/ClientAppWrapper';
import { ThemeProvider } from 'next-themes';
import { ProjectsProvider } from "@/context/ProjectsContext";

interface Props {
  children: ReactNode;
  params: Promise<{ lang: 'en' | 'es' }>; // params es Promise
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params; // <-- await aquí

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