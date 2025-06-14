"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toast, useToastContext } from "@/providers/ToastProvider";

interface ToastItemProps {
  toast: Toast;
  index: number;
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: {
    gradient: "from-emerald-500/20 via-emerald-400/10 to-green-500/20",
    border: "border-emerald-500/40 shadow-emerald-500/20",
    iconGradient: "from-emerald-500 to-green-600",
    iconShadow: "shadow-emerald-500/40",
    progressBar: "bg-gradient-to-r from-emerald-500 to-green-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.25)]",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
  },
  error: {
    gradient: "from-red-500/20 via-rose-400/10 to-pink-500/20",
    border: "border-red-500/40 shadow-red-500/20",
    iconGradient: "from-red-500 to-rose-600",
    iconShadow: "shadow-red-500/40",
    progressBar: "bg-gradient-to-r from-red-500 to-rose-500",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.25)]",
    iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
  },
  warning: {
    gradient: "from-amber-500/20 via-yellow-400/10 to-orange-500/20",
    border: "border-amber-500/40 shadow-amber-500/20",
    iconGradient: "from-amber-500 to-orange-600",
    iconShadow: "shadow-amber-500/40",
    progressBar: "bg-gradient-to-r from-amber-500 to-orange-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.25)]",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  info: {
    gradient: "from-blue-500/20 via-cyan-400/10 to-indigo-500/20",
    border: "border-blue-500/40 shadow-blue-500/20",
    iconGradient: "from-blue-500 to-indigo-600",
    iconShadow: "shadow-blue-500/40",
    progressBar: "bg-gradient-to-r from-blue-500 to-indigo-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.25)]",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
};

export const ToastItem: React.FC<ToastItemProps> = ({ toast, index }) => {
  const { removeToast, pauseToast, resumeToast } = useToastContext();
  const Icon = toastIcons[toast.type];
  const styles = toastStyles[toast.type];

  return (
    <AnimatePresence>
      {toast.isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            x: 500,
            scale: 0.9,
            rotateX: 45,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            rotateX: 0,
            y: -(index * 70),
          }}
          exit={{
            opacity: 0,
            x: 500,
            scale: 0.8,
            rotateX: -20,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.5,
          }}
          onMouseEnter={() => {
            pauseToast(toast.id);
          }}
          onMouseLeave={() => resumeToast(toast.id)}
          className={cn(
            "fixed bottom-6 right-6 z-[999] w-[350px] max-w-[85vw] pointer-events-auto",
            "border-2 rounded-xl overflow-hidden",
            "backdrop-blur-xl bg-gradient-to-br",
            styles.gradient,
            styles.border,
            styles.glow,
            "shadow-xl",
            "dark:shadow-lg",
            "transform-gpu perspective-1000"
          )}
          style={{
            background: `linear-gradient(135deg,
              hsl(var(--background)) 0%,
              hsl(var(--background)/0.95) 100%)`,
          }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10 hover:hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          {/* Enhanced progress bar with glow */}
          <motion.div
            className={cn(
              "absolute top-0 left-0 h-1 rounded-t-xl shadow-md",
              styles.progressBar
            )}
            initial={{ width: "100%" }}
            animate={{ width: toast.isPaused ? "100%" : "0%" }}
            transition={{
              // Use remainingDuration when not paused, otherwise 0
              duration: toast.isPaused
                ? 0
                : (toast.remainingDuration || 5000) / 1000,
              ease: "linear",
            }}
          />

          {/* Side accent bar */}
          <div
            className={cn(
              "absolute left-0 top-0 w-1 h-full",
              styles.progressBar
            )}
          />

          <div className="relative p-4">
            <div className="flex items-start gap-3">
              {/* Enhanced icon with multiple effects */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 600,
                  damping: 15,
                }}
                className="relative flex-shrink-0"
              >
                {/* Icon glow effect */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-lg blur-sm opacity-60",
                    styles.iconBg
                  )}
                />

                <div
                  className={cn(
                    "relative p-2 rounded-lg",
                    styles.iconBg,
                    "shadow-md transform-gpu"
                  )}
                >
                  <Icon className="w-5 h-5 text-white drop-shadow-sm" />

                  {/* Sparkle effect for success */}
                  {toast.type === "success" && (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-0.5 -right-0.5"
                    >
                      <Zap className="w-2.5 h-2.5 text-yellow-300" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Enhanced content area */}
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-2 mb-1"
                >
                  <h4 className="font-semibold text-foreground text-sm tracking-tight">
                    {toast.title}
                  </h4>
                  {/* Status indicator dot */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={cn("w-1.5 h-1.5 rounded-full", styles.iconBg)}
                  />
                </motion.div>

                {toast.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-muted-foreground leading-relaxed mb-2"
                  >
                    {toast.description}
                  </motion.p>
                )}

                {/* Enhanced action buttons */}
                {toast.actions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex gap-1.5"
                  >
                    {toast.actions.map((action, actionIndex) => (
                      <motion.button
                        key={actionIndex}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          action.onClick();
                          removeToast(toast.id);
                        }}
                        className={cn(
                          "px-3 py-1.5 text-xs font-medium rounded-md",
                          "transition-all duration-200 transform-gpu",
                          "focus:outline-none focus:ring-2 focus:ring-offset-2",
                          "shadow-md hover:shadow-lg",
                          action.variant === "destructive"
                            ? cn(
                                "bg-gradient-to-r from-red-500 to-rose-600",
                                "hover:from-red-600 hover:to-rose-700",
                                "text-white shadow-red-500/25",
                                "focus:ring-red-500"
                              )
                            : cn(
                                "bg-gradient-to-r from-primary to-primary/80",
                                "hover:from-primary/90 hover:to-primary/70",
                                "text-primary-foreground",
                                "focus:ring-primary"
                              )
                        )}
                      >
                        {action.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Enhanced close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0, rotate: 90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeToast(toast.id)}
                className={cn(
                  "flex-shrink-0 p-1.5 rounded-lg",
                  "text-muted-foreground hover:text-foreground",
                  "transition-all duration-200 transform-gpu",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "hover:bg-background/50 backdrop-blur-sm"
                )}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-0.5",
              styles.progressBar,
              "opacity-60"
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
