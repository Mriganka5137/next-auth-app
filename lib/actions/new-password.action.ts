"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "../db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  //   No token --> return error
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { password } = validatedFields.data;
  const existsingToken = await getPasswordResetTokenByToken(token);
  if (!existsingToken) {
    return { error: "Invalid token" };
  }

  // if expired, return error
  const hasExpired = new Date(existsingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }

  //check if user exists
  const existingUser = await getUserByEmail(existsingToken.email);
  if (!existingUser) {
    return { error: "Email does not exists!" };
  }

  //   has password and update
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  //   delete token
  await db.passwordResetToken.delete({
    where: {
      id: existsingToken.id,
    },
  });

  return { success: "Password updated" };
};
