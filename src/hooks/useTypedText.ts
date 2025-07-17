import { useEffect, useState } from "react";

interface UseTypedTextProps {
    texts: string[];
    typingSpeed?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
}

export function useTypedText({
    texts,
    typingSpeed = 100,
    pauseDuration = 3000,
    deletingSpeed = 50,
}: UseTypedTextProps) {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    // Reset everything if texts array changes
    useEffect(() => {
        setText("");
        setIndex(0);
        setSubIndex(0);
        setDeleting(false);
    }, [texts.join(" ")]); // key change when texts change

    useEffect(() => {
        if (texts.length === 0) return;

        const currentText = texts[index];

        if (!deleting && subIndex === currentText.length) {
            const pause = setTimeout(() => setDeleting(true), pauseDuration);
            return () => clearTimeout(pause);
        }

        if (deleting && subIndex === 0) {
            setDeleting(false);
            setIndex((prev) => (prev + 1) % texts.length);
            return;
        }

        const timeout = setTimeout(() => {
            const newSubIndex = deleting ? subIndex - 1 : subIndex + 1;
            setText(currentText.substring(0, newSubIndex));
            setSubIndex(newSubIndex);
        }, deleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [texts, index, subIndex, deleting, typingSpeed, pauseDuration, deletingSpeed]);

    return text;
}
