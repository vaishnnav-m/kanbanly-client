import {
  Briefcase,
  Coffee,
  Heart,
  Music,
  Rocket,
  Settings,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import React from "react";

function WorkspaceIconDisplay({ name }: { name: string }) {
  const presetIconsMap: { [key: string]: React.ElementType } = {
    briefcase: Briefcase,
    users: Users,
    settings: Settings,
    heart: Heart,
    star: Star,
    zap: Zap,
    target: Target,
    rocket: Rocket,
    coffee: Coffee,
    music: Music,
  };
  const IconComponent = presetIconsMap[name];
  return <IconComponent />;
}

export default WorkspaceIconDisplay;
