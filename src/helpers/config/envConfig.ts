export const getBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:3030/api/v1";
};
