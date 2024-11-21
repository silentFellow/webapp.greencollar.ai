import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseQuery = (queryObject: Record<string, string | number | null>): string => {
  return Object.entries(queryObject)
    .filter(([, value]) => value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

export const checkPermissions = (allowed: "gca_admin" | "gca_operator" | "user"): boolean => {
  // TODO: use zustand store
  const currenUserRole = "gca_admin";

  const level: { [key: string]: number } = {
    gca_admin: 0,
    gca_operator: 2,
    user: 1,
  };

  if (!Object.keys(level).includes(allowed.toLowerCase())) return false;
  if (level[currenUserRole.toLowerCase()] < level[allowed.toLowerCase()]) return false;
  return true;
};

export const checkRegex = (pattern: RegExp, val: string): boolean => {
  const regex = new RegExp(pattern);
  return regex.test(val);
};

export const getCurrentDateTime = (index: number = 0) => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds() + index).padStart(2, "0");

  return {
    day,
    month,
    year,
    hours,
    minutes,
    seconds,
  };
};

export const parseFileSize = (byte: number): string => {
  return (byte / 1048576).toFixed(2) + " MB";
};
