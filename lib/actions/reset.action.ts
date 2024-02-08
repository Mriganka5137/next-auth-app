"use server";
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
import { sendPasswordResetmail } from "../mail";
import { generatePasswordResetToken } from "../tokens";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email not found!" };

  // 1. Generate a password reset token
  const passwordResetToken = await generatePasswordResetToken(email);

  // 2. Send the password reset email
  await sendPasswordResetmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent! Check your inbox!" };
};
