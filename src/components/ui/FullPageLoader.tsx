// components/ui/FullPageLoader.tsx
"use client";

import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

export default function FullPageLoader() {
    return (
        <section className="min-h-screen flex items-center justify-center">
            <motion.div
                className="flex flex-col items-center justify-center space-y-4 p-8 rounded-2xl border border-indigo-500 shadow-md bg-white dark:bg-gray-900"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Ícono girando */}
                <motion.div
                    className="text-indigo-500"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                >
                    <FiLoader size={48} />
                </motion.div>

                {/* Texto con animación fade in-out */}
                <motion.p
                    className="text-indigo-700 text-lg font-medium text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Cargando proyectos...
                </motion.p>
            </motion.div>
        </section>
    );
}
