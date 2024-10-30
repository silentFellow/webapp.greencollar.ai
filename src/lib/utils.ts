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
