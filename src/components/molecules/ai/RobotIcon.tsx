"use client";
import { useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

export const RobotIcon = ({
  className,
  isTransmitting,
}: {
  className?: string;
  isTransmitting?: boolean;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const startBlinking = async () => {
      while (isMounted) {
        const delay = 3000 + Math.random() * 2000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (!isMounted) return;
        await controls.start({ scaleY: 0.1, transition: { duration: 0.1 } });
        if (!isMounted) return;
        await controls.start({ scaleY: 1, transition: { duration: 0.1 } });
      }
    };

    startBlinking();
    return () => {
      isMounted = false;
    };
  }, [controls]);

  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(265, 89%, 66%)" />
          <stop offset="100%" stopColor="hsl(243, 75%, 59%)" />
        </linearGradient>
        <pattern
          id="dotPattern"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.5" fill="white" fillOpacity="0.2" />
        </pattern>
      </defs>

      {/* Ears */}
      <rect
        x="1"
        y="11"
        width="2"
        height="7"
        rx="1"
        fill="url(#robotGradient)"
      />
      <rect
        x="21"
        y="11"
        width="2"
        height="7"
        rx="1"
        fill="url(#robotGradient)"
      />

      {/* Head with Gradient and Pattern */}
      <rect
        x="3"
        y="8"
        width="18"
        height="13"
        rx="4"
        ry="4"
        fill="url(#robotGradient)"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />
      <rect
        x="3"
        y="8"
        width="18"
        height="13"
        rx="4"
        ry="4"
        fill="url(#dotPattern)"
      />

      {isTransmitting && (
        <>
          {/* Transmitting Signal Animation */}
          <AnimatePresence>
            <motion.circle
              cx="12"
              cy="4"
              r="1"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 2.5],
                strokeWidth: [1.5, 0],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              cx="12"
              cy="4"
              r="1"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 2.5],
                strokeWidth: [1.5, 0],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1,
              }}
            />
          </AnimatePresence>
          {/* Antenna Tip */}
          <circle cx="12" cy="4" r="1.5" fill="white" />
        </>
      )}

      {/* Eyes */}
      <motion.ellipse
        cx="9"
        cy="14"
        rx="1.5"
        ry="2"
        fill="white"
        initial={{ scaleY: 1 }}
        animate={controls}
      />
      <motion.ellipse
        cx="15"
        cy="14"
        rx="1.5"
        ry="2"
        fill="white"
        initial={{ scaleY: 1 }}
        animate={controls}
      />

      {/* Smile */}
      <path
        d="M9 18c1.5 1 4.5 1 6 0"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
};
