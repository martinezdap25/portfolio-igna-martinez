"use client";

import { motion } from "framer-motion";
import AboutImage from "./AboutImage";
import AboutHeader from "./AboutHeader";
import AboutTags from "./AboutTags";
import AboutFooter from "./AboutFooter";
import { Dictionary } from "@/types/directory";

interface Props {
  dict: Dictionary;
}

export default function AboutMe({ dict }: Props) {
  return (
    <section className="w-full max-w-7xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-md p-4 sm:p-8 flex flex-col md:flex-row items-stretch gap-10"
      >
        <AboutImage dict={dict} />

        <div className="flex-1 flex flex-col justify-between w-full">
          <div>
            <AboutHeader dict={dict} />
          </div>

          <AboutTags tags={dict.about.tags} />

          <hr className="border-gray-300 dark:border-gray-700 w-full my-8 lg:my-0" />

          <AboutFooter dict={dict} />
        </div>
      </motion.div>
    </section>
  );
}
