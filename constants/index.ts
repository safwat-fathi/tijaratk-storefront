
// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN || "access_token",
  REFRESH_TOKEN: process.env.NEXT_PUBLIC_REFRESH_TOKEN || "refresh_token",
  CSRF_TOKEN: process.env.NEXT_PUBLIC_CSRF_COOKIE_NAME || "csrf_token",
  USER_ID: "user_id",
  IS_ADMIN: "is_admin",
  SESSION: "session",
  USER_DATA: "user_data",
  THEME: "theme",
} as const;
