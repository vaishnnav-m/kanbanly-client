import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { getSignature, uploadPicture } from "../api/cloudinary";
import { ApiResponse } from "../api/common.types";
import {
  CloudinarySignatureResponse,
  CloudinaryUploadArgs,
} from "../api/cloudinary/cloudinary.types";
import { useToastMessage } from "./useToastMessage";

export const useGetSignature = () => {
  return useQuery<ApiResponse<CloudinarySignatureResponse>, Error>({
    queryKey: ["getSignature"],
    queryFn: () => getSignature(),
  });
};

export const useUploadPicture = () => {
  const toast = useToastMessage();

  return useMutation<{ secure_url: string }, Error, CloudinaryUploadArgs>({
    mutationKey: ["uploadPicture"],
    mutationFn: uploadPicture,
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      console.log("error in uploading", error);
      toast.showError({
        title: "Upload failed!",
        description: errorMessage || "Failed to upload image",
        duration: 6000,
      });
    },
  });
};
