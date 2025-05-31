// components/molecules/ThemeToggleButton.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setIsClicked(true);
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.button
      className="relative w-10 h-10 rounded-full border-2 border-border bg-card shadow-lg focus:outline-none overflow-hidden"
      onClick={handleToggle}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: isDark
            ? "conic-gradient(from 0deg, hsl(259 80% 70%), hsl(170 70% 50%), hsl(259 80% 70%))"
            : "conic-gradient(from 0deg, hsl(259 94% 66%), hsl(170 78% 44%), hsl(259 94% 66%))",
        }}
        animate={isHovered ? { rotate: [0, 360] } : { rotate: 0 }}
        transition={
          isHovered
            ? {
                repeat: Infinity,
                duration: 4,
                ease: "linear",
              }
            : {
                duration: 0.3,
              }
        }
      />
      <motion.div
        className="absolute inset-1 rounded-full bg-background flex items-center justify-center"
        animate={{
          scale: isClicked ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Icon container with flip animation */}
        <motion.div
          className="relative w-5 h-5"
          animate={{
            rotateY: isDark ? 180 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Sun Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
            }}
            animate={{
              opacity: isDark ? 0 : 1,
            }}
          >
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isClicked ? 1.3 : 1,
              }}
              transition={{
                rotate: {
                  duration: 2,
                  ease: "linear",
                  repeat: isHovered ? Infinity : 0,
                },
                scale: { duration: 0.2 },
              }}
            >
              <Sun size={18} className="text-yellow-500" strokeWidth={2} />
            </motion.div>
          </motion.div>

          {/* Moon Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            animate={{
              opacity: isDark ? 1 : 0,
            }}
          >
            <motion.div
              animate={{
                rotate: isHovered ? -45 : 0,
                scale: isClicked ? 1.3 : 1,
              }}
              transition={{
                rotate: { duration: 1, ease: "easeInOut" },
                scale: { duration: 0.2 },
              }}
            >
              <Moon size={18} className="text-blue-400" strokeWidth={2} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Sparkle effect on click */}
        <AnimatePresence>
          {isClicked && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  initial={{
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * 60 * Math.PI) / 180) * 20,
                    y: Math.sin((i * 60 * Math.PI) / 180) * 20,
                    opacity: [1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pulse ring on click */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: isDark ? "hsl(259 80% 70%)" : "hsl(259 94% 66%)",
            }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
