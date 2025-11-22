"use client";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import {
  PasswordChangeData,
  UpdateUserPasswordPayload,
} from "@/lib/api/user/user.types";
import { Eye, EyeOff, Lock, Save, Shield, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface SecuritySettingsCardProps {
  isPasswordEditing: boolean;
  setIsPasswordEditing: Dispatch<SetStateAction<boolean>>;
  uploadPassword: (data: UpdateUserPasswordPayload) => void;
  isPasswordLoading: boolean;
  isEditing: boolean;
}

export const SecuritySettingsCard = ({
  isPasswordEditing,
  setIsPasswordEditing,
  uploadPassword,
  isPasswordLoading,
  isEditing,
}: SecuritySettingsCardProps) => {
  // erors
  const [errors, setErrors] = useState<
    Partial<Record<keyof PasswordChangeData, string>>
  >({});
  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = async () => {
    setErrors({});

    const newErros = validate(passwordData);
    if (Object.keys(newErros).length > 0) {
      setErrors(newErros);
      return;
    }

    uploadPassword({
      newPassword: passwordData.newPassword,
      oldPassword: passwordData.currentPassword,
    });
  };

  // password
  const handlePasswordCancel = () => {
    setIsPasswordEditing(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validate = (values: PasswordChangeData) => {
    const newErrors: Partial<Record<keyof PasswordChangeData, string>> = {};

    if (!values?.currentPassword?.trim()) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!values?.newPassword?.trim()) {
      newErrors.newPassword = "New password is required.";
    } else if (values.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long.";
    }

    if (!values?.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (values.newPassword !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!isPasswordEditing ? (
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-foreground">Password</h3>
              <p className="text-muted-foreground">
                Change your account password
              </p>
            </div>
            <Button
              className="hover:bg-gray-500/20"
              onClick={() => setIsPasswordEditing(true)}
              variant="outline"
              disabled={isEditing}
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="bg-background border-border text-foreground pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500">{errors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="bg-background border-border text-foreground pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="bg-background border-border text-foreground pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                onClick={handlePasswordChange}
                disabled={
                  isPasswordLoading ||
                  !passwordData.currentPassword ||
                  !passwordData.newPassword ||
                  !passwordData.confirmPassword
                }
                variant="default"
              >
                <Save className="w-4 h-4 mr-2" />
                {isPasswordLoading ? "Changing..." : "Change Password"}
              </Button>
              <Button
                className="hover:bg-gray-500/20"
                onClick={handlePasswordCancel}
                variant="outline"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
