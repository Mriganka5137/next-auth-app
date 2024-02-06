"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid credentials!" };
  }
  return { success: "Email is sent!" };
};
