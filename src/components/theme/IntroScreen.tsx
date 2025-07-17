"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CircuitBoardAnimation from "./TechnologiesAnimation";

export default function IntroScreen() {
    const fullText = "Bienvenido! | Programador web Full-stack";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [hide, setHide] = useState(false); // controla salida

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                setIndex(index + 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <AnimatePresence>
            {!hide && (
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }} // 👈 solo se desliza hacia arriba
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center bg-gray-900 text-white px-6 text-center space-y-8"
                >
                    <CircuitBoardAnimation />
                    {/* Imagen con animación */}
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

                    {/* Nombre */}
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white tracking-in-expand">
                        Ignacio Martínez
                    </h1>

                    {/* Texto máquina de escribir */}
                    <p className="text-xl md:text-2xl text-gray-300 font-mono max-w-xl mx-auto">
                        {displayedText}
                        <span className="animate-pulse text-white">|</span>
                    </p>

                    {/* Botón con hover */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 2 }}
                        className="w-28 h-28 rounded-full bg-white text-gray-900 flex items-center justify-center cursor-pointer wobble-hor-bottom font-semibold text-sm md:text-lg shadow-md hover:bg-indigo-600 hover:text-white hover:shadow-xl transition-all duration-300"
                        onClick={() => setHide(true)}
                    >
                        Comenzar
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
