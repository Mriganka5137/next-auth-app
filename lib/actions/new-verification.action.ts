"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "../db";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  //   get the verification token by the token from db
  const existingToken = await getVerificationTokenByToken(token);

  //   if the token does not exist, return an error
  if (!existingToken) {
    return { error: "Token does not exists!" };
  }

  //   check if existing token is expired
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  //get the existing user by email
  const existingUser = await getUserByEmail(existingToken.email);

  //   if the user does not exist, return an error
  if (!existingUser) {
    return { error: "Email does not exists" };
  }

  //   if the user exists, update the user emailVerified field to the current date
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  //   delete the verification token from the db
  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email verified!" };
};
