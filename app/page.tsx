'use client'
import NavigateButton from "@/components/Navigate";
import { AuroraBackground } from "@/src/components/ui/aurora-background";
import { motion } from "motion/react";

export default function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <main className="flex-grow min-h-screen flex flex-col items-center justify-center px-4 md:px-24">
          <section className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold">
              Dive into the World of AI Persona
            </h1>
            <p className="mt-3 md:mt-4 text-green-500 dark:text-white text-3xl md:text-5xl font-bold"></p>
          </section>
          <NavigateButton />
        </main>
      </motion.div>
    </AuroraBackground>
  );
}
