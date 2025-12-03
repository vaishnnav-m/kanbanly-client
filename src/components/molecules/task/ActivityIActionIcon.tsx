import { TaskActivityActionEnum } from "@/lib/api/activity/activity.types";
import {
  CirclePlus,
  Edit3,
  FileEdit,
  GitBranch,
  Link2,
  MessageSquare,
  Trash2,
  Unlink2,
  UserPlus,
} from "lucide-react";

export const ActivityActionIcon = ({ action }: { action: TaskActivityActionEnum }) => {
  switch (action) {
    case TaskActivityActionEnum.TaskCreated:
      return <CirclePlus className="w-3 h-3" />;

    case TaskActivityActionEnum.TaskUpdated:
      return <Edit3 className="w-3 h-3" />;

    case TaskActivityActionEnum.StatusChanged:
      return <GitBranch className="w-3 h-3" />;

    case TaskActivityActionEnum.Commented:
      return <MessageSquare className="w-3 h-3" />;

    case TaskActivityActionEnum.CommentEdited:
      return <Edit3 className="w-3 h-3" />;

    case TaskActivityActionEnum.CommentDeleted:
      return <Trash2 className="w-3 h-3" />;

    case TaskActivityActionEnum.TaskAssigned:
      return <UserPlus className="w-3 h-3" />;

    case TaskActivityActionEnum.SprintAttached:
      return <Link2 className="w-3 h-3" />;

    case TaskActivityActionEnum.SprintDetached:
      return <Unlink2 className="w-3 h-3" />;

    default:
      return <FileEdit className="w-3 h-3" />;
  }
};
