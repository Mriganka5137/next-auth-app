"use server";
import { currentRole } from "@/lib/auth";

export const admin = async () => {
  const role = await currentRole();
  if (role === "ADMIN") {
    return { status: 200 };
  }
  return { status: 403 };
};
