"use client";
import WorkspaceDetailsSkeleton from "@/components/organisms/workspace/WorkspaceManageSkeleton";
import { UserManagementTemplate } from "@/components/templates/user/UserManagement";
import {
  UpdateUserPasswordPayload,
  UpdateUserProfilePayload,
} from "@/lib/api/user/user.types";
import {
  useCreateCustomerPortal,
  useGetUserSubscription,
} from "@/lib/hooks/useSubscription";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
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

  const toast = useToastMessage();
  const { mutate: createCustomerPortal } = useCreateCustomerPortal({
    onSuccess: (response) => {
      if (!response.data) {
        toast.showError({
          title: "An Error !",
          description: "Please try again or try contacting support",
          duration: 6000,
        });
        return;
      }

      if (!response.data.url) {
        toast.showError({
          title: "An Error !",
          description: "Please try again or try contacting support",
          duration: 6000,
        });
        return;
      }
      window.location.href = response.data.url;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Please try again or try contacting support",
        description: errorMessage,
        duration: 6000,
      });
    },
  });

  function updateUserProfile(data: UpdateUserProfilePayload) {
    updateProfile(data);
  }

  function handleUpdatePassword(data: UpdateUserPasswordPayload) {
    updatePassword(data);
  }

  function handleCreateCustomerPortal() {
    createCustomerPortal();
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
      handleCreateCustomerPortal={handleCreateCustomerPortal}
    />
  );
}
