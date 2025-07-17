"use client";

import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

export default function Loader() {
  // Para controlar cuando mostrar la animación de los puntos
  const [dots, setDots] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-900"
    >
      <motion.div
        animate={{
          scale: [1, 1.5, 1.5, 1, 1],
          rotate: [0, 0, 90, 90, 0],
          borderRadius: ["0%", "25%", "50%", "25%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.3, 0.6, 0.9, 1],
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#6366f1",
          borderRadius: 10,
          marginBottom: 24,
        }}
      />

      <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold select-none">
        Cargando
        <span className="inline-block w-4 text-indigo-600 font-bold">{dots}</span>
      </p>
    </motion.div>
  );
}
