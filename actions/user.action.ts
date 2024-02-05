"use server";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";

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

  // Send verification token email

  return { success: "User created!" };
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByID = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
