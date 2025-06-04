const EMAIL_VERIFIED_STORAGE_KEY = "isEmailVerified";

export const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(EMAIL_VERIFIED_STORAGE_KEY, token);
  }
};

export const getIEmailVerified = (): boolean | null => {
  if (typeof window !== "undefined") {
    const storedStatus = localStorage.getItem(EMAIL_VERIFIED_STORAGE_KEY);
    
  }
  return null;
};

export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(EMAIL_VERIFIED_STORAGE_KEY);
  }
};
