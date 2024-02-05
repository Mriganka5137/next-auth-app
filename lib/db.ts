import { PrismaClient } from "@prisma/client";

//  This file is used to create a new PrismaClient instance and export it as db.
//  The PrismaClient instance is then used to interact with the database in the rest of the application.
// If the application is running in production, the PrismaClient instance is created and exported as db.
// If the application is running in development, the PrismaClient instance is created and stored in the globalThis object. because the PrismaClient instance is not hot-reloadable, it is important to store it in the globalThis object so that it is not recreated on every request.

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
