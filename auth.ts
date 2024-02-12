import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserByID } from "./data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserByID(user.id!);

      // Prevent sign in if email is not verified
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        // delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token?.sub) return token;
      const existingUser = await getUserByID(token.sub!);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.name = existingUser.name;
      token.email = existingUser.email;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

/**
 * 1. signIn callback:

This is triggered when a user successfully signs in through any provider (e.g., Google, GitHub).
It receives information about the user, account, profile, email, and credentials used for login.
What you can do here: You can perform additional checks or validations on the user before allowing them access. Here, it simply returns true to proceed.


2. redirect callback:

This determines where the user is redirected after a successful login or sign-up.
It receives the url that NextAuth would normally redirect to and the baseUrl of your application.
What you can do here: You can modify the redirect URL based on certain conditions. Here, it returns the baseUrl to redirect to the homepage.


3. session callback:

This happens after a successful login or sign-up and before rendering the user's session.
It receives the existing session object (if any), user information, and the JSON Web Token (JWT).
What you can do here: You can add extra data to the session object that will be available throughout the user's session, like access levels or specific permissions. Here, it returns the session without modification.


4. jwt callback:

This gets called before a JWT is returned to the client after login or sign-up.
It receives the existing JWT token, user information, account details, profile data, and a flag indicating if it's a new user.
What you can do here: You can add custom information to the JWT token that will be sent to the client and accessible on the frontend. Here, it returns the token without modification.
 * 
 */
