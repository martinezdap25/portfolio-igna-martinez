import { getDictionary } from "@/app/[lang]/dictionaries";
import AboutMe from "@/components/about-me/AboutMe";
import { Dictionary } from "@/types/directory";

interface Props {
  params: {
    lang: "en" | "es";
  };
}

export default async function Page({ params: { lang } }: Props) {
  const dict: Dictionary = await getDictionary(lang);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <main>
        <AboutMe dict={dict} />
      </main>
    </div>
  );
}
