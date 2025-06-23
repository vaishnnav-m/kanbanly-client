"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icon as LucideIconComponent } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";

interface FeatureCardProps {
  icon: React.ReactElement<React.ComponentProps<typeof LucideIconComponent>>;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20 hover:border-primary/40 dark:border-primary/30 dark:hover:border-primary/50">
        <CardHeader className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary dark:bg-primary/20">
            {React.cloneElement(icon, { size: 32, strokeWidth: 1.5 })}
          </div>
          <CardTitle className="text-xl font-semibold mb-2 text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-foreground/70 text-sm dark:text-foreground/60">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
