import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import { Dictionary } from "@/types/directory";

export default function AboutFooter({ dict }: { dict: Dictionary }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end flex-wrap gap-4 w-full">
      <div className="flex gap-6 text-gray-700 dark:text-gray-300 text-2xl mb-2 sm:mb-0 justify-center sm:justify-start w-full sm:w-auto">
        <a href="https://github.com/martinezdap25" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/ignacio-martinez-dev" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://www.instagram.com/nachomartinezdap" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="mailto:martinezignaciodev@gmail.com"><FaEnvelope /></a>
      </div>

      <a
        href="https://cert.efset.org/es/wJGgSG"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto rounded-full bg-green-600 text-white px-6 py-2 font-semibold shadow-lg hover:bg-green-700 transition-colors duration-300 whitespace-nowrap text-center"
      >
        {dict.about.certificate}
      </a>
    </div>
  );
}
