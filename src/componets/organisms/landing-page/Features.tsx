"use client";
import React from "react";
import {
  ShieldCheck,
  Users,
  LayoutGrid,
  KanbanSquare,
  Rocket,
  BarChart2,
  MessageSquare,
  Settings2,
} from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <ShieldCheck />,
    title: "Authentication & Role Access",
    description:
      "Secure login with role-based permissions for tailored access control.",
  },
  {
    icon: <Users />,
    title: "Workspace & User Management",
    description:
      "Easily manage workspaces, teams, and user roles within your organization.",
  },
  {
    icon: <LayoutGrid />,
    title: "Agile Project Management",
    description:
      "Flexible task and project tracking designed for agile methodologies.",
  },
  {
    icon: <KanbanSquare />,
    title: "Real-Time Kanban Board",
    description: "Visualize workflows with dynamic, real-time Kanban boards.",
  },
  {
    icon: <Rocket />,
    title: "Sprint & Epic Tracking",
    description:
      "Organize work into sprints and epics for better long-term planning.",
  },
  {
    icon: <BarChart2 />,
    title: "Dashboard & Analytics",
    description:
      "Gain insights with comprehensive dashboards and project analytics.",
  },
  {
    icon: <MessageSquare />,
    title: "Notifications & Comments",
    description:
      "Stay updated with real-time notifications and in-task discussions.",
  },
  {
    icon: <Settings2 />,
    title: "Admin Panel & Plan Control",
    description:
      "Full administrative control over settings, plans, and billing.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need,{" "}
            <span className="gradient-text">All In One Place</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Kanbanly provides a comprehensive suite of tools to manage your
            projects efficiently from start to finish.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
