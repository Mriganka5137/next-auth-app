"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid credentials!" };
  }
  const { email, password } = validation.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "An error occurred!" };
      }
    }
    throw error;
  }
};
