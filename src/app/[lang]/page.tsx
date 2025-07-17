import { getDictionary } from "@/app/[lang]/dictionaries";
import AboutMe from "@/components/about-me/AboutMe";
import { Dictionary } from "@/types/directory";

interface Props {
  params: Promise<{ lang: "en" | "es" }>; // ahora es una promesa
}

export default async function Page({ params }: Props) {
  const { lang } = await params; // ✅ acceso correcto ahora

  const dict: Dictionary = await getDictionary(lang);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <main>
        <AboutMe dict={dict} />
      </main>
    </div>
  );
}
