"use client";

import { useState } from "react";
import { FaLightbulb, FaPuzzlePiece, FaRocket, FaCheckCircle } from "react-icons/fa";
import type { Project } from "@/types/project";
import { motion, AnimatePresence } from "framer-motion";

const tabConfig = [
    { key: "features", label: "Características", icon: <FaRocket /> },
    { key: "challenges", label: "Desafíos", icon: <FaPuzzlePiece /> },
    { key: "learnings", label: "Aprendizajes", icon: <FaLightbulb /> },
];

interface InfoCardProps {
    project: Project;
    lang: "es" | "en";
}

export default function InfoCard({ project, lang }: InfoCardProps) {
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
        <div className="rounded-2xl bg-white/90 backdrop-blur-md shadow-md ring-1 ring-gray-300 p-6 space-y-6">
            {/* Tabs */}
            <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden bg-gray-100">
                {tabConfig.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as typeof activeTab)}
                        className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-200
            ${activeTab === tab.key
                                ? "bg-indigo-700 text-white shadow"
                                : "text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
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
                    className="space-y-3"
                >
                    {getContent().map((item, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 bg-indigo-50/60 text-indigo-900 rounded-lg px-4 py-2 shadow-sm ring-1 ring-indigo-200"
                        >
                            <FaCheckCircle className="mt-1 text-indigo-600" />
                            <span className="leading-snug">{item}</span>
                        </li>
                    ))}
                </motion.ul>
            </AnimatePresence>
        </div>
    );
}