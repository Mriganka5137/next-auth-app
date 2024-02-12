"use server";
import * as z from "zod";
import { db } from "../db";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "../auth";
import { getUserByID } from "@/data/user";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized!" };
  }

  // Check if the user exists in the database
  const dbuser = await getUserByID(user.id!);
  if (!dbuser) {
    return { error: "Unauthorized!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (!values.name) {
    return { error: "Name cannot be empty!" };
  }
  // Update the user
  await db.user.update({
    where: { id: dbuser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated!" };
};
