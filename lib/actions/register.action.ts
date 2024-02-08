"use server";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { db } from "../db";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../tokens";
import { sendVerificationEmail } from "../mail";

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid credentials!" };
  }

  const { email, name, password } = validation.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  // Send email
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
