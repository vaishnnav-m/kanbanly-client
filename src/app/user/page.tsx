"use client";
import WorkspaceDetailsSkeleton from "@/components/organisms/workspace/WorkspaceManageSkeleton";
import { UserManagementTemplate } from "@/components/templates/user/UserManagement";
import {
  UpdateUserPasswordPayload,
  UpdateUserProfilePayload,
} from "@/lib/api/user/user.types";
import { useGetUserSubscription } from "@/lib/hooks/useSubscription";
import {
  useGetUserProfile,
  useUpdateUserPassword,
  useUpdateUserProfile,
} from "@/lib/hooks/useUser";

export default function UserProfile() {
  const { data, isFetching } = useGetUserProfile();
  const { data: subscriptionData } = useGetUserSubscription();

  const { mutate: updateProfile, isPending: isEditLoading } =
    useUpdateUserProfile();
  const { mutate: updatePassword, isPending: isPasswordPending } =
    useUpdateUserPassword();

  function updateUserProfile(data: UpdateUserProfilePayload) {
    updateProfile(data);
  }

  function handleUpdatePassword(data: UpdateUserPasswordPayload) {
    updatePassword(data);
  }

  if (!data?.data || isFetching) {
    return <WorkspaceDetailsSkeleton />;
  }

  return (
    <UserManagementTemplate
      isEditLoading={isEditLoading}
      isPasswordLoading={isPasswordPending}
      uploadEdited={updateUserProfile}
      userData={data.data}
      uploadPassword={handleUpdatePassword}
      subscription={subscriptionData?.data}
    />
  );
}
