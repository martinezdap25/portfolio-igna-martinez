"use client";

import { useState } from "react";
import Image from "next/image";
import GithubStats from "@/components/theme/GithunStats";
import FlipCard from "@/components/about-me/FlipCard";
import Modal from "@/components/ui/Modal";
import { Dictionary } from "@/types/directory";

export default function AboutImage({ dict }: { dict: Dictionary }) {
    const cards = [
        {
            id: 1,
            src: "https://res.cloudinary.com/dsugc0qfa/image/upload/v1752795934/logoitse2_xilb5g.png",
            certificadoSrc:
                "https://res.cloudinary.com/dsugc0qfa/image/upload/t_u1/1752799573756-484b7c0d-239d-4e72-919e-cc7b2135ae1f_1_hc5b1i",
            title: "Certificado de ITSE - Instituto tecnologico de Santiago del Estero",
            description: "Certificado emitido por ITSE",
        },
        {
            id: 2,
            src: "https://res.cloudinary.com/dsugc0qfa/image/upload/v1752795934/channels4_profile_qzle6r.jpg",
            certificadoSrc:
                "https://res.cloudinary.com/dsugc0qfa/image/upload/v1752797678/Ignacio_Martinez_bc97dae7-05db-45e4-86c0-575730f12ca5_bwmu1e.png",
            title: "Certificado de SoyHenry - Bootcamp | Full-stack Developer",
            description: "Certificado emitido por SoyHenry",
        },
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null);

    function handleCardClick(card: typeof cards[0]) {
        setSelectedCard(card);
        setModalOpen(true);
    }

    return (
        <div className="flex flex-col justify-between items-center shrink-0 w-full max-w-[250px] mx-auto md:min-h-[450px]">
            {/* Imagen de perfil */}
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

            {/* Título de certificaciones */}
            <h3 className="mt-6 text-lg font-base text-center text-gray-800 dark:text-gray-200">
                { dict.about.certificateTitle }
            </h3>

            {/* Tarjetas giratorias */}
            <div className="mt-2 grid grid-cols-2 gap-4">
                {cards.map((card) => (
                    <FlipCard
                        key={card.id}
                        backImageSrc={card.src}
                        alt={card.title}
                        size={70}
                        onClick={() => handleCardClick(card)}
                    />
                ))}
            </div>

            <div className="w-full mt-6">
                <GithubStats />
            </div>

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {selectedCard && (
                    <>
                        <h2 className="text-xl font-bold mb-2">{selectedCard.title}</h2>
                        <p>{selectedCard.description}</p>
                        <Image
                            src={selectedCard.certificadoSrc}
                            alt={`Certificado de ${selectedCard.title}`}
                            width={300}
                            height={300}
                            className="mt-4 rounded-lg object-cover"
                        />
                    </>
                )}
            </Modal>
        </div>
    );
}
