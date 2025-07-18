"use client";
import { motion } from "framer-motion";

export default function AboutTags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {tags.map((text, index) => (
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
  );
}
