"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TechnologiesAnimation from "./TechnologiesAnimation";
import { useTypedText } from "@/hooks/useTypedText";

interface IntroScreenProps {
    dict: {
        intro: {
            welcome: string;
            roles: string[];
            button: string;
        };
    };
}

export default function IntroScreen({ dict }: IntroScreenProps) {
    const [hide, setHide] = useState(true); // por defecto oculto

    const text = useTypedText({
        texts: dict.intro.roles,
        typingSpeed: 70,
        pauseDuration: 2000,
        deletingSpeed: 40,
    });

    useEffect(() => {
        const introSeen = localStorage.getItem("introSeen");
        if (!introSeen) {
            setHide(false); // solo lo mostramos si no fue visto
        }
    }, []);

    const handleHideIntro = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("introSeen", "true");
            localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
        }
        setHide(true);
    };

    return (
        <AnimatePresence>
            {!hide && (
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center 
                    bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white px-6 text-center space-y-8"
                >
                    <TechnologiesAnimation />

                    <motion.div
                        initial={{ rotateY: 180, opacity: 0, scale: 0.8 }}
                        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        style={{ perspective: 600 }}
                    >
                        <Image
                            src="https://res.cloudinary.com/dsugc0qfa/image/upload/v1752710264/Imagen_de_WhatsApp_2025-06-07_a_las_01.09.22_6c4dfbd1_ojm05r.jpg"
                            alt="Ignacio Martínez"
                            width={256}
                            height={256}
                            className="w-full h-full object-cover rounded-full"
                            unoptimized
                        />
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-in-expand">
                        Ignacio Martínez
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-500 font-mono max-w-xl mx-auto">
                        {dict.intro.welcome} | {text}
                        <span className="animate-pulse text-gray-500 dark:text-white">|</span>
                    </p>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 2 }}
                        className="w-28 h-28 rounded-full bg-indigo-600 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center cursor-pointer wobble-hor-bottom font-semibold text-sm md:text-lg shadow-md dark:hover:bg-indigo-600 hover:bg-indigo-700 hover:text-white hover:shadow-xl transition-all duration-300"
                        onClick={handleHideIntro}
                    >
                        {dict.intro.button}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
