"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

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

  const isDarkResolved = resolvedTheme === "dark";

  const handleToggle = () => {
    setIsClicked(true);
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
    setTimeout(() => setIsClicked(false), 300);
  };

  const getNextThemeLabel = () => {
    if (theme === "light") return "dark";
    if (theme === "dark") return "system";
    return "light";
  };

  return (
    <motion.button
      className="relative w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg focus:outline-none overflow-hidden"
      onClick={handleToggle}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      aria-label={`Switch to ${getNextThemeLabel()} mode`}
    >
      {/* Background gradient based on resolved theme */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: isDarkResolved
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
      {/* Inner circle with icon */}
      <motion.div
        className="absolute inset-1 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center"
        animate={{
          scale: isClicked ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Icon container with animations */}
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" && (
            <motion.div
              key="sun-icon"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
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
          )}
          {theme === "dark" && (
            <motion.div
              key="moon-icon"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
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
          )}
          {theme === "system" && (
            <motion.div
              key="system-icon"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: isClicked ? 1.3 : 1,
                }}
                transition={{
                  scale: { duration: 0.2 },
                }}
              >
                <Monitor size={18} className="text-gray-500" strokeWidth={2} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sparkle effect on click */}
        <AnimatePresence>
          {isClicked && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-500 rounded-full" // Changed to a generic primary color
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
                    delay: i * 0.05, // Slightly reduced delay for quicker effect
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
              borderColor: isDarkResolved
                ? "hsl(259 80% 70%)"
                : "hsl(259 94% 66%)",
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
