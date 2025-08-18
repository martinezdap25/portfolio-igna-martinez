import { Dictionary } from "@/types/directory";

export default function AboutHeader({ dict }: { dict: Dictionary }) {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {dict.about.title}{" "}
        <span className="text-indigo-600">Ignacio Martínez</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base sm:text-lg">
        {dict.about.description}
      </p>
      <a
        href="https://drive.google.com/uc?export=download&id=1Gx20zrEn4pUY6rtaQiPrDkH16Py1vyXe"
        target="_blank"
        rel="noopener noreferrer"
        download="Ignacio_Martinez_CV.pdf"
        className="block w-full sm:inline-block sm:w-auto rounded-full bg-indigo-600 text-white px-6 py-2 font-semibold shadow-lg hover:bg-indigo-700 transition-colors duration-300 text-center"
      >
        {dict.about.cv}
      </a>
    </>
  );
}
