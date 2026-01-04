import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx"
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const requireId = (id: string | null) => {
  if (!id) {
    return NextResponse.json(
      { message: "Habit ID is required" },
      { status: 400 }
    );
  }
};

export const normalizeAxiosError = (error: unknown): Error => {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.message ??
      error.message ??
      "Request failed";

    return new Error(message);
  }

  return new Error("Unexpected error occurred");
};

  export const normalizeDate = (d: string | Date | undefined) => {
    if (!d) return "";

    const date = typeof d === "string" ? new Date(d) : d;

    return new Intl.DateTimeFormat("en-CA", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(date);
  };

  export const localizeDate = (d: string | Date | undefined) => {
    if (!d) return "";

    const date = typeof d === "string" ? new Date(d) : d;

    return new Intl.DateTimeFormat("en-CA", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(date);
  };
