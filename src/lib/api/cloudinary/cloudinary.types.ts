export interface CloudinarySignatureResponse {
  timeStamp: number;
  apiKey: string;
  cloudName: string;
  signature: string;
}

export interface CloudinaryData {
  file: File;
  apiKey: string;
  timeStamp: number;
  signature: string;
  folder: string;
}

export interface CloudinaryUploadArgs {
  cloudName: string;
  data: FormData;
}
