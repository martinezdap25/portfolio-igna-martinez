"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import GithubStats from "@/components/theme/GithunStats";
import { Dictionary } from "@/types/directory";

interface Props {
    dict: Dictionary;
}

export default function AboutMe({ dict }: Props) {
    return (
        <section className="w-full max-w-7xl mx-auto py-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-md p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-stretch gap-10"
            >
                {/* Columna izquierda */}
                <div className="flex flex-col justify-between items-center shrink-0 w-full max-w-[250px] mx-auto md:min-h-[450px]">
                    {/* Imagen */}
                    <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden shadow-lg border-2 border-indigo-600 dark:border-gray-700">
                        <Image
                            src="https://res.cloudinary.com/dsugc0qfa/image/upload/v1752710264/Imagen_de_WhatsApp_2025-06-07_a_las_01.09.22_6c4dfbd1_ojm05r.jpg"
                            alt="Ignacio Martínez"
                            width={250}
                            height={250}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>

                    {/* Stats abajo */}
                    <div className="w-full mt-6">
                        <GithubStats />
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {dict.about.title}{" "}
                            <span className="text-indigo-600">Ignacio Martínez</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base sm:text-lg">
                            {dict.about.description}
                        </p>
                        <a
                            href="/cv.pdf"
                            download
                            className="block w-full sm:inline-block sm:w-auto rounded-full bg-indigo-600 text-white px-6 py-2 font-semibold shadow-lg hover:bg-indigo-700 transition-colors duration-300 text-center"
                        >
                            {dict.about.cv}
                        </a>
                    </div>

                    {/* Tags */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        {dict.about.tags.map((text, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow"
                            >
                                {text}
                            </motion.span>
                        ))}
                    </div>

                    <hr className="my-8 border-gray-300 dark:border-gray-700 w-full" />

                    {/* Redes + certificado */}
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end flex-wrap gap-4 w-full">
                        <div className="flex gap-6 text-gray-700 dark:text-gray-300 text-2xl mb-2 sm:mb-0 justify-center sm:justify-start w-full sm:w-auto">
                            <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                            <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                            <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                            <a href="mailto:tuemail@ejemplo.com"><FaEnvelope /></a>
                        </div>

                        <a
                            href="/certificado-ingles-b2.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto rounded-full bg-green-600 text-white px-6 py-2 font-semibold shadow-lg hover:bg-green-700 transition-colors duration-300 whitespace-nowrap text-center"
                        >
                            {dict.about.certificate}
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
