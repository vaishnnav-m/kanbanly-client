export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
};

export const appConfig = {
  googleAuth: {
    oauthClientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    REDIRECT_URI:
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ||
      "http://localhost:5000/api/v1/auth/google/callback",
  },
  cloudinary: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  },
};
