"use client";

import Image from "next/image";
import { FaEye } from "react-icons/fa";

interface FlipCardProps {
    frontIcon?: React.ReactNode;
    backImageSrc: string;
    alt?: string;
    size?: number;
    onClick?: () => void;
}

export default function FlipCard({
    frontIcon = <FaEye size={32} />,
    backImageSrc,
    alt = "Flip card image",
    size = 70,
    onClick,
}: FlipCardProps) {
    return (
        <div
            className="flip-card cursor-pointer"
            style={{ width: size, height: size }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
        >
            <div className="flip-card-inner">
                {/* Frente: Imagen */}
                <div className="flip-card-front rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <Image
                        src={backImageSrc}
                        alt={alt}
                        width={size}
                        height={size}
                        className="object-cover w-full h-full"
                    />
                </div>
                {/* Dorso: Ícono ojo */}
                <div className="flip-card-back bg-indigo-600 text-white flex items-center justify-center rounded-lg shadow-md">
                    {frontIcon}
                </div>
            </div>
        </div>
    );
}
