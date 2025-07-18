"use client";

import { useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";
import IntroScreen from "./IntroScreen";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import TechnologiesAnimation from "./TechnologiesAnimation";
import { Dictionary } from "@/types/directory";
import { ProjectsProvider } from "@/context/ProjectsContext";

interface Props {
    dict: Dictionary;
    children: ReactNode;
}

export default function ClientAppWrapper({ dict, children }: Props) {
    const [loading, setLoading] = useState(true);
    const [showIntro, setShowIntro] = useState(false);

    const pathname = usePathname();
    const lang = pathname?.split("/")[1] || "es";

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);

            const introSeen = localStorage.getItem("introSeen");
            if (!introSeen) {
                setShowIntro(true);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleIntroFinish = () => {
        localStorage.setItem("introSeen", "true");
        setShowIntro(false);
    };

    if (loading) return <Loader />;
    if (showIntro) return <IntroScreen dict={dict} onFinish={handleIntroFinish} />;

    return (
        <>
            <ProjectsProvider>
                <Header lang={lang} dict={dict} />
                <TechnologiesAnimation withBackground={true} />
                {children}
                <Footer dictionary={dict} />
            </ProjectsProvider>
        </>
    );
}
