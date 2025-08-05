"use client";
import { useState } from "react";
import {
  Edit3,
  Save,
  X,
  Calendar,
  Lock,
  User,
  Mail,
  Shield,
  EyeOff,
  Eye,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { getDate } from "@/lib/utils";
import {
  PasswordChangeData,
  UpdateUserPasswordPayload,
  UpdateUserProfilePayload,
  UserProfileData,
} from "@/lib/api/user/user.types";
import Header from "@/components/organisms/user/Header";
import Link from "next/link";

interface UserManagementTemplateProps {
  userData: UserProfileData;
  uploadEdited: (data: UpdateUserProfilePayload) => void;
  uploadPassword: (data: UpdateUserPasswordPayload) => void;
  isEditLoading: boolean;
  isPasswordLoading: boolean;
}

export function UserManagementTemplate({
  userData,
  uploadEdited,
  isEditLoading,
  isPasswordLoading,
  uploadPassword,
}: UserManagementTemplateProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [editData, setEditData] = useState<UpdateUserProfilePayload>({});
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

  // erors
  const [errors, setErrors] = useState<
    Partial<Record<keyof PasswordChangeData, string>>
  >({});

  const handleSave = () => {
    if (!editData) {
      return;
    }
    uploadEdited(editData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
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

  const handlePasswordChange = async () => {
    setErrors({});

    const newErros = validate(passwordData);
    if (Object.keys(newErros).length > 0) {
      setErrors(newErros);
      return;
    }
    console.log("sending..");

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

  return (
    <main className="flex-1 p-8 pt-20 bg-background min-h-screen">
      <div className="w-full h-[75px] bg-background fixed z-50 top-0 py-5 px-10 flex justify-between">
        <div className="flex gap-16">
          <Link href="/workspaces" className="font-bold text-2xl">
            Kanbanly
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Profile Management
            </h1>
            <p className="text-muted-foreground">
              Manage user information and settings
            </p>
          </div>

          {!isEditing && !isPasswordEditing && (
            <div className="flex gap-4">
              <Button onClick={handleEdit} variant="default" size="lg">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* User Profile Card */}
          <Card className="bg-card border border-border">
            <CardContent className="p-8">
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            First Name
                          </label>
                          <Input
                            value={editData.firstName || userData.firstName}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                firstName: e.target.value,
                              })
                            }
                            className="bg-background border-border text-foreground"
                            placeholder="Enter first name"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Last Name
                          </label>
                          <Input
                            value={editData.lastName || userData.lastName}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                lastName: e.target.value,
                              })
                            }
                            className="bg-background border-border text-foreground"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button
                          onClick={handleSave}
                          size="lg"
                          variant="default"
                          disabled={isEditLoading}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isEditLoading ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          className="hover:bg-gray-500/20"
                          onClick={handleCancel}
                          variant="outline"
                          size="lg"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Full Name
                          </h3>
                          <p className="text-foreground text-lg">
                            {userData.firstName} {userData.lastName}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </h3>
                          <p className="text-foreground text-lg">
                            {userData.email}
                          </p>
                        </div>

                        {!userData.isGoogleLogin && (
                          <div className="space-y-3">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Password
                            </h3>
                            <p className="text-foreground text-lg font-mono">
                              {"*".repeat(8)}
                            </p>
                          </div>
                        )}

                        {userData.createdAt && (
                          <div className="space-y-3">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Member Since
                            </h3>
                            <p className="text-foreground text-lg">
                              {getDate(userData.createdAt)}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password Change Card */}
          {!userData.isGoogleLogin && (
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
                      <h3 className="text-lg font-medium text-foreground">
                        Password
                      </h3>
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
          )}
        </div>
      </div>
    </main>
  );
}
