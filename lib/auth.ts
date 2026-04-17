import { betterAuth, google } from "better-auth";
//import { PrismaClient } from "@/generated/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

// const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
