import axios from "axios";
import api from "../axios";
import { CloudinaryUploadArgs } from "./cloudinary.types";
import { appConfig } from "@/lib/config";

export const getSignature = async () => {
  const response = await api.get(`/cloudinary/signature`);
  return response.data;
};

export const uploadPicture = async ({
  cloudName,
  data,
}: CloudinaryUploadArgs) => {
  console.log("cloudinary url",appConfig.cloudinary.CLOUDINARY_URL);
  const response = await axios.post(
    `${appConfig.cloudinary.CLOUDINARY_URL}/${cloudName}/image/upload`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
