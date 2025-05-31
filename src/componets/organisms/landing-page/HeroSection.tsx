"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../../atoms/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-background to-indigo-100 dark:from-background dark:to-indigo-900/30">
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-2xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/30 rounded-full filter blur-2xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6"
        >
          <span className="gradient-text">Kanbanly</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10"
        >
          Streamline teamwork, sprints, and everything in between.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 w-full sm:w-auto transform transition-transform duration-200 hover:scale-105"
          >
            <Link href="/signup">Get Started</Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 w-full sm:w-auto transform transition-transform duration-200 hover:scale-105"
          >
            See Features
          </Button>
        </motion.div>

        {/* Placeholder for dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 md:mt-24 max-w-4xl mx-auto"
        >
          <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-xl shadow-2xl flex items-center justify-center">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Dashboard Mockup / Animation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
