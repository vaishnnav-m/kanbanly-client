export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
};

export const appConfig = {
  googleAuth: {
    oauthClientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    REDIRECT_URI:
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ||
      "http://localhost:5000/api/v1/auth/google/callback",
  },
  cloudinary: {
    CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
  },
};
