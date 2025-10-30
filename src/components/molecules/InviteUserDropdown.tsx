"use client";
import { useState, useRef, useEffect } from "react";
import { UserPlus, X, Search } from "lucide-react";
import { useDebounce } from "@/lib/utils";
import { useWorkspaceMembers } from "@/lib/hooks/useWorkspace";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Avatar, AvatarImage } from "../atoms/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface InviteUserDropdownProps {
  isOpen: boolean;
  buttonLabel?: string;
  onClose: () => void;
  onInvite: (data: {
    invitedEmail?: string;
    email?: string;
    role?: string;
  }) => void;
  isLoading: boolean;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const InviteUserDropdown = ({
  buttonLabel,
  isOpen,
  onClose,
  onInvite,
  isLoading,
  buttonRef,
}: InviteUserDropdownProps) => {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // members fetching
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const debouncedSearch = useDebounce(searchQuery);

  const { data: membersData } = useWorkspaceMembers(
    workspaceId,
    1,
    debouncedSearch
  );
  const members = membersData?.data ? membersData.data.data : [];

  // Source suggestions (prefer real suggestions if provided)
  const sourceSuggestions: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }[] = members.map((member) => ({
    email: member.email,
    id: member._id,
    name: member.name,
    avatar: member.profile,
  }));

  // Filter suggestions based on search query
  const filteredSuggestions = sourceSuggestions.filter(
    (suggestion) =>
      suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Position the dropdown near the trigger button without overflowing viewport
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [maxHeightPx, setMaxHeightPx] = useState<number>(0);

  useEffect(() => {
    const computePosition = () => {
      if (!isOpen || !buttonRef.current) return;
      const viewportPadding = 8;
      const buttonRect = buttonRef.current.getBoundingClientRect();

      // Compute desired width clamped to viewport
      const desiredWidth = Math.max(buttonRect.width, 320);
      const maxWidth = Math.max(0, window.innerWidth - viewportPadding * 2);
      const width = Math.min(desiredWidth, maxWidth);

      // Prefer left alignment
      let left = buttonRect.left;
      if (left + width > window.innerWidth - viewportPadding) {
        left = Math.max(viewportPadding, buttonRect.right - width);
      }
      left = Math.max(
        viewportPadding,
        Math.min(left, window.innerWidth - viewportPadding - width)
      );

      // Default place below
      const top = buttonRect.bottom + viewportPadding;
      const availableBelow = Math.max(
        0,
        window.innerHeight - viewportPadding - top
      );
      setMaxHeightPx(availableBelow);

      setPosition({ top, left, width });

      requestAnimationFrame(() => {
        const dropdownEl = dropdownRef.current;
        if (!dropdownEl) return;
        const rect = dropdownEl.getBoundingClientRect();
        const bottomOverflow =
          rect.bottom > window.innerHeight - viewportPadding;
        if (bottomOverflow) {
          const newTop = Math.max(
            viewportPadding,
            buttonRect.top - rect.height - viewportPadding
          );
          setPosition((prev) => ({ ...prev, top: newTop }));
          const availableAbove = Math.max(0, buttonRect.top - viewportPadding);
          setMaxHeightPx(availableAbove);
        }
      });

      // Focus the input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    computePosition();

    if (isOpen) {
      const handleWindowChange = () => computePosition();
      window.addEventListener("resize", handleWindowChange);
      window.addEventListener("scroll", handleWindowChange, true);
      return () => {
        window.removeEventListener("resize", handleWindowChange);
        window.removeEventListener("scroll", handleWindowChange, true);
      };
    }
  }, [isOpen, buttonRef]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose, buttonRef]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestion((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestion((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedSuggestion >= 0 && filteredSuggestions[selectedSuggestion]) {
        handleSelectSuggestion(filteredSuggestions[selectedSuggestion]);
      } else if (email.trim()) {
        handleInvite();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSelectSuggestion = (suggestion: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }) => {
    setEmail(suggestion.email);
    setSearchQuery("");
    setSelectedSuggestion(-1);
  };

  const handleInvite = () => {
    if (email.trim()) {
      // Send the email in the format expected by the parent component
      onInvite({
        invitedEmail: email.trim(),
        email: email.trim(),
        role: "member",
      });
      setEmail("");
      setSearchQuery("");
      setSelectedSuggestion(-1);
      onClose();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSearchQuery(e.target.value);
    setSelectedSuggestion(-1);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-auto"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        maxHeight: maxHeightPx ? `${maxHeightPx}px` : undefined,
      }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Invite user
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              ref={inputRef}
              type="email"
              placeholder="Enter email or search users..."
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm"
            />
          </div>

          {/* Suggestions dropdown */}
          {searchQuery && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-[min(60vh,32rem)] overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-3 ${
                    selectedSuggestion === index
                      ? "bg-gray-100 dark:bg-gray-600"
                      : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={suggestion?.avatar} />
                    <AvatarFallback>
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-xs font-medium text-purple-700 dark:text-purple-300">
                        {suggestion.name?.[0]?.toUpperCase()}
                      </div>
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {suggestion.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {suggestion.email}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No suggestions message */}
          {searchQuery && filteredSuggestions.length === 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-3">
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                No users found. Enter an email to invite.
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={!email.trim() || isLoading}
            className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {isLoading ? (
              <>
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                {buttonLabel ? buttonLabel + "ing" : "Inviting"}...
              </>
            ) : (
              <>
                <UserPlus className="w-3 h-3" />
                {buttonLabel ? buttonLabel : "Invite"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
