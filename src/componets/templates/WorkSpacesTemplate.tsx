"use client";
import { motion } from "framer-motion";
import { User, Plus, Building2, Users, Briefcase, LogOut } from "lucide-react";
import { ThemeToggleButton } from "../molecules/ThemeToggleButton";

const WorkSpacesTemplate = ({ handleLogout }: { handleLogout: () => void }) => {
  const workspaces = [
    {
      id: 1,
      name: "Marketing Team",
      description: "Brand campaigns and content strategy",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-purple-600",
      members: 12,
    },
    {
      id: 2,
      name: "Product Development",
      description: "Feature planning and roadmap",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-purple-500 to-pink-600",
      members: 8,
    },
    {
      id: 3,
      name: "Design Studio",
      description: "UI/UX and creative projects",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-600",
      members: 6,
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300
        bg-gradient-to-br from-gradientFromLight via-gradientViaLight to-gradientToLight
        dark:from-gradientFromDark dark:via-gradientViaDark dark:to-gradientToDark`}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center p-6 lg:px-12"
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center`}
          >
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <h1 className={`text-2xl font-bold text-foreground`}>Kanbanly</h1>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggleButton />
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
          >
            <User className="w-5 h-5 text-white" />
          </div>
          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center cursor-pointer text-white
              hover:from-red-600 hover:to-pink-700 transition-all duration-300`}
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-4xl lg:text-5xl font-bold mb-4 text-foreground`}
            >
              Choose your workspace
            </h2>
            <p
              className={`text-lg lg:text-xl text-muted-foreground dark:text-gray-300`}
            >
              Select a workspace to continue or create a new one
            </p>
          </motion.div>

          {/* Workspace Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {workspaces.map((workspace, index) => (
              <motion.div
                key={workspace.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group backdrop-blur-sm
                  bg-card/70 border-border
                  dark:bg-card/50 dark:border-border
                  shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                <div className="p-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${workspace.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {workspace.icon}
                  </div>

                  <h3 className={`text-xl font-semibold mb-2 text-foreground`}>
                    {workspace.name}
                  </h3>

                  <p className={`text-sm mb-4 text-muted-foreground`}>
                    {workspace.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs text-muted-foreground`}>
                      {workspace.members} members
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${workspace.color}`}
                    ></div>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-r ${workspace.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl border-2 border-dashed transition-all duration-300
                border-border text-muted-foreground
                hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50
                dark:hover:border-purple-500 dark:hover:text-purple-400 dark:hover:bg-purple-500/5`}
            >
              <Plus className="w-6 h-6" />
              <span className="font-medium text-lg">Create new workspace</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpacesTemplate;
