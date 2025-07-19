"use client";

import { motion } from "framer-motion";
import { FaLightbulb, FaPuzzlePiece, FaRocket } from "react-icons/fa";
import type { Project } from "@/types/project";
import { Dictionary } from "@/types/directory";

interface Props {
  project: Project;
  dict: Dictionary;
  lang: "es" | "en";
}

export default function ProjectDetail({ project, dict, lang }: Props) {
  const features = project.features?.[lang] ?? [];
  const challenges = project.challenges?.[lang] ?? [];
  const learnings = project.learnings?.[lang] ?? [];

  const sectionStyle =
    "rounded-2xl shadow-sm bg-black/15 ring-1 ring-gray-200 p-6 space-y-4";

  const listStyle = "list-disc list-inside text-gray-700 space-y-1";

  const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-10">
      {features.length > 0 && (
        <motion.section
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
          className={sectionStyle}
        >
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <FaRocket />
            {dict.projects.features}
          </h2>
          <ul className={listStyle}>
            {features.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {challenges.length > 0 && (
        <motion.section
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.1 }}
          className={sectionStyle}
        >
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <FaPuzzlePiece />
            {dict.projects.challenges}
          </h2>
          <ul className={listStyle}>
            {challenges.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {learnings.length > 0 && (
        <motion.section
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.2 }}
          className={sectionStyle}
        >
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <FaLightbulb />
            {dict.projects.learnings}
          </h2>
          <ul className={listStyle}>
            {learnings.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.section>
      )}
    </div>
  );
}
