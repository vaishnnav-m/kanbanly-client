"use client";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useGetProjectMembers } from "./hooks/useProject";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { WorkspaceMember } from "./api/workspace/workspace.types";
import { User } from "lucide-react";
import { SuggestionProps } from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { RootState } from "@/store";
import { Button } from "@/components/atoms/button";

interface MentionListProps extends SuggestionProps {
  command: (user: WorkspaceMember) => void;
}

interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const MentionList = forwardRef<MentionListRef, MentionListProps>(
  (props: MentionListProps, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const workspaceId = useSelector(
      (state: RootState) => state.workspace.workspaceId
    );
    const params = useParams();

    const { data: membersData, isLoading } = useGetProjectMembers(
      workspaceId,
      params.projectId as string,
      props.query
    );

    const members = useMemo(
      () => (membersData?.data ? membersData.data : []),
      [membersData?.data]
    );

    const selectItem = (index: number) => {
      const item = members[index];
      if (item) {
        props.command(item);
      }
    };

    useEffect(() => setSelectedIndex(0), [members]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          setSelectedIndex(
            (selectedIndex + members.length - 1) % members.length
          );
          return true;
        }
        if (event.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % members.length);
          return true;
        }
        if (event.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      },
    }));

    return (
      <div className="bg-background border border-border rounded-lg shadow-xl overflow-hidden p-1 min-w-[200px]">
        {isLoading && <div className="p-2 text-sm">Fetching...</div>}
        {!isLoading && members.length > 0
          ? members.map((item, index) => (
              <Button
                variant="ghost"
                key={item._id}
                className={`flex justify-start w-full text-left p-2 rounded-md ${
                  index === selectedIndex ? "bg-muted" : ""
                }`}
                onClick={() => selectItem(index)}
              >
                <Avatar className="size-5">
                  <AvatarImage src={item.profile} />
                  <AvatarFallback>
                    <div className="p-2 bg-gray-500/30 rounded-full">
                      <User className="size-5" />
                    </div>
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{item.name}</span>
              </Button>
            ))
          : null}
        {!isLoading && members.length === 0 && (
          <div className="p-2 text-sm text-muted-foreground">No results</div>
        )}
      </div>
    );
  }
);
MentionList.displayName = "MentionList";

export const suggestion = {
  items: () => {
    return [];
  },

  render: () => {
    let component: ReactRenderer<MentionListRef, MentionListProps>;
    let popup: Instance[];

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(MentionList, {
          props: {
            ...props,
            command: (user: WorkspaceMember) => {
              props.editor
                .chain()
                .focus()
                .insertContentAt(props.range, [
                  {
                    type: "mention",
                    attrs: { id: user._id, label: user.name },
                  },
                ])
                .run();
            },
          },
          editor: props.editor,
        });

        if (!props.clientRect) return;

        popup = tippy("body", {
          getReferenceClientRect: () =>
            props.clientRect?.() || new DOMRect(0, 0, 0, 0),
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: SuggestionProps) {
        component.updateProps(props);
        if (!props.clientRect) return;
        popup[0].setProps({
          getReferenceClientRect: () =>
            props.clientRect?.() || new DOMRect(0, 0, 0, 0),
        });
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === "Escape") {
          popup[0].hide();
          return true;
        }
        return component.ref?.onKeyDown(props) ?? false;
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
