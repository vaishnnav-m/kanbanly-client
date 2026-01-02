import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { getSignature, uploadPicture } from "../api/cloudinary";
import { ApiResponse } from "../api/common.types";
import {
  CloudinarySignatureResponse,
  CloudinaryUploadArgs,
} from "../api/cloudinary/cloudinary.types";
import { useToastMessage } from "./useToastMessage";
import { AxiosError } from "axios";

export const useGetSignature = () => {
  return useQuery<ApiResponse<CloudinarySignatureResponse>, Error>({
    queryKey: ["getSignature"],
    queryFn: () => getSignature(),
  });
};

export const useUploadPicture = () => {
  const toast = useToastMessage();

  return useMutation<{ secure_url: string }, AxiosError<{ message: string }>, CloudinaryUploadArgs>({
    mutationKey: ["uploadPicture"],
    mutationFn: uploadPicture,
    onError: (error: AxiosError<{ message: string }>) => {
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
