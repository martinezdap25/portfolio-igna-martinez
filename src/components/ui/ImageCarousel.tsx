"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageObject {
    url: string;
    alt: string;
    isMain?: boolean;
}

interface ImageCarouselProps {
    images: ImageObject[];
    heightClass?: string;
    objectPosition?: string;
}

export default function ImageCarousel({
    images,
    heightClass = "h-48",
    objectPosition = "center",
}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) =>
            (prev + newDirection + images.length) % images.length
        );
    };

    if (!images || images.length === 0) return null;

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    return (
        <div className={`relative w-full ${heightClass} overflow-hidden rounded-t-xl`}>
            <AnimatePresence custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[currentIndex].url}
                        alt={images[currentIndex].alt}
                        fill
                        className={`object-cover object-${objectPosition}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
                <>
                    {/* Botones */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/60 transition"
                        aria-label="Anterior"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/60 transition"
                        aria-label="Siguiente"
                    >
                        ›
                    </button>

                    {/* Indicador de posición */}
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-md backdrop-blur-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
}