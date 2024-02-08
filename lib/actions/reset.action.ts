"use server";
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Emauil not found!" };

  // TODO: send reset email
  return { success: "Reset email sent! Check your inbox!" };
};
