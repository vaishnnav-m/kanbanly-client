import { Mail, Smartphone } from "lucide-react";
import { Label } from "@/components/atoms/label";
import { Switch } from "@/components/atoms/switch";
import { Card } from "@/components/atoms/card";
import { Separator } from "@/components/atoms/separator";
import {
  PreferenceResponse,
  UpdatePreferencesPayload,
} from "@/lib/api/user/user.types";

interface NotificationRowProps {
  label: string;
  description: string;
  emailChecked: boolean;
  pushChecked: boolean;
  onEmailChange: (checked: boolean) => void;
  onPushChange: (checked: boolean) => void;
}

const NotificationRow = ({
  label,
  description,
  emailChecked,
  pushChecked,
  onEmailChange,
  onPushChange,
}: NotificationRowProps) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex-1">
      <div className="font-medium text-sm">{label}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
    <div className="flex items-center gap-12">
      <Switch
        className="scale-75"
        checked={emailChecked}
        onCheckedChange={onEmailChange}
      />
      <Switch
        className="scale-75"
        checked={pushChecked}
        onCheckedChange={onPushChange}
      />
    </div>
  </div>
);

interface PreferenceCardProps {
  notifications: PreferenceResponse;
  handlePreferenceUpdate: (payload: UpdatePreferencesPayload) => void;
}

export const PreferenceCard = ({
  notifications,
  handlePreferenceUpdate,
}: PreferenceCardProps) => {
  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Notification Type</h3>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <Label>Email</Label>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <Label>Push</Label>
          </div>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Tasks & Assignments */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-2">Tasks & Assignments</h4>
        <NotificationRow
          label="Task assigned to me"
          description="Get notified when someone assigns a task to you"
          emailChecked={notifications.taskAssigned.email}
          pushChecked={notifications.taskAssigned.app}
          onEmailChange={(checked) => {
            handlePreferenceUpdate({ taskAssigned: { email: checked } });
          }}
          onPushChange={(checked) => {
            handlePreferenceUpdate({ taskAssigned: { app: checked } });
          }}
        />
        <NotificationRow
          label="Task completed"
          description="Notifications when tasks you're watching are completed"
          emailChecked={notifications.taskCompleted.email}
          pushChecked={notifications.taskCompleted.app}
          onEmailChange={(checked) => {
            handlePreferenceUpdate({ taskCompleted: { email: checked } });
          }}
          onPushChange={(checked) => {
            handlePreferenceUpdate({ taskCompleted: { app: checked } });
          }}
        />
        <NotificationRow
          label="Due date reminders"
          description="Reminders before tasks are due"
          emailChecked={notifications.dueDateReminder.email}
          pushChecked={notifications.dueDateReminder.app}
          onEmailChange={(checked) => {
            handlePreferenceUpdate({ dueDateReminder: { email: checked } });
          }}
          onPushChange={(checked) => {
            handlePreferenceUpdate({ dueDateReminder: { app: checked } });
          }}
        />
      </div>

      <Separator className="mb-4" />

      {/* Communication */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-2">Communication</h4>
        <NotificationRow
          label="Comments & mentions"
          description="Someone comments on your task or mentions you"
          emailChecked={notifications.mention.email}
          pushChecked={notifications.mention.app}
          onEmailChange={(checked) => {
            handlePreferenceUpdate({ mention: { email: checked } });
          }}
          onPushChange={(checked) => {
            handlePreferenceUpdate({ mention: { app: checked } });
          }}
        />
      </div>

      <Separator className="mb-4" />

      {/* Projects & Teams */}
      <div>
        <h4 className="font-semibold text-sm mb-2">Projects & Teams</h4>
        <NotificationRow
          label="Sprint updates"
          description="Updates about sprits you're a member of"
          emailChecked={notifications.sprint.email}
          pushChecked={notifications.sprint.app}
          onEmailChange={(checked) => {
            handlePreferenceUpdate({ sprint: { email: checked } });
          }}
          onPushChange={(checked) => {
            handlePreferenceUpdate({ sprint: { app: checked } });
          }}
        />
        <NotificationRow
          label="Workspace invitations"
          description="When you're invited to join a workspace"
          emailChecked={notifications.invitation.email}
          pushChecked={notifications.invitation.app}
          onEmailChange={(checked) => {
            handlePreferenceUpdate({ invitation: { email: checked } });
          }}
          onPushChange={(checked) => {
            handlePreferenceUpdate({ invitation: { app: checked } });
          }}
        />
      </div>
    </Card>
  );
};
