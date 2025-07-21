"use client";

import { useState } from "react";
import { FaLightbulb, FaPuzzlePiece, FaRocket, FaCheckCircle } from "react-icons/fa";
import type { Project } from "@/types/project";
import { motion, AnimatePresence } from "framer-motion";
import { Dictionary } from "@/types/directory";

const tabConfig = (dict: Dictionary) => [
    { key: "features", label: dict.projects.features, icon: <FaRocket /> },
    { key: "challenges", label: dict.projects.challenges, icon: <FaPuzzlePiece /> },
    { key: "learnings", label: dict.projects.learnings, icon: <FaLightbulb /> },
];

interface InfoCardProps {
    project: Project;
    lang: "es" | "en";
    dict: Dictionary;
}

export default function InfoCard({ project, lang, dict }: InfoCardProps) {
    const [activeTab, setActiveTab] = useState<"features" | "challenges" | "learnings">("features");

    const getContent = (): string[] => {
        switch (activeTab) {
            case "features":
                return project.features[lang];
            case "challenges":
                return project.challenges[lang];
            case "learnings":
                return project.learnings[lang];
            default:
                return [];
        }
    };

    return (
        <div className="rounded-2xl bg-white/90 dark:bg-gray-900/90 dark:ring-indigo-700/80 backdrop-blur-md shadow-md ring-1 ring-gray-300 dark:ring dark:shadow-indigo-900/50 p-4 sm:p-6 space-y-6">
            {/* Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-1 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                {tabConfig(dict).map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as typeof activeTab)}
                        className={`flex items-center justify-start sm:justify-center gap-3 px-4 py-3 sm:py-2 text-base sm:text-sm font-semibold transition-all duration-200 rounded-md sm:rounded-none
                            ${activeTab === tab.key
                                ? "bg-indigo-700 dark:bg-indigo-500 text-white shadow-md dark:shadow-indigo-700/80"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-indigo-700/50"
                            }`}
                    >
                        <span className="text-lg">{tab.icon}</span>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.ul
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3 max-h-[60vh] overflow-y-auto p-2 pl-0.5 text-gray-900 dark:text-gray-200"
                >
                    {getContent().map((item, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 bg-indigo-50/60 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-300 rounded-lg px-4 py-3 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-600"
                        >
                            <FaCheckCircle className="mt-1 text-indigo-600 dark:text-indigo-400 shrink-0" />
                            <span className="leading-snug">{item}</span>
                        </li>
                    ))}
                </motion.ul>
            </AnimatePresence>
        </div>
    );
}

