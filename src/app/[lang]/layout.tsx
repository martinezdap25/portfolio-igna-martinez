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

  const title = dict.titles.home;
  const description = dict.meta.home.description || "Portfolio de Ignacio Martinez";

  const ogImage = "https://res.cloudinary.com/dsugc0qfa/image/upload/v1756410976/Opera_Captura_de_pantalla_2025-08-28_160427_ignacio-martinez.vercel.app_cqczrz.png"; // Cambia por la URL real

  return {
    title: {
      default: title,
      template: `%s | Ignacio Martinez Portfolio`,
    },
    description,
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title,
      description,
      url: 'https://ignacio-martinez.vercel.app/', // Cambia por la URL real
      siteName: 'Ignacio Martinez Portfolio',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Preview de Ignacio Martinez Portfolio',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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