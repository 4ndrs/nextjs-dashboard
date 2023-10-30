import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { authConfig } from "./auth.config";

import type { User } from "@/app/lib/definitions";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);

          if (!user) {
            return null;
          }

          // node runs here, no bun support :<
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        console.log("Invalid credentials");

        return null;
      },
    }),
  ],
});

const getUser = async (email: string) => {
  try {
    const user = await sql<User>`SELECT * from USERS where email=${email}`;

    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);

    throw new Error("Failed to fetch user");
  }
};
