import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { generateSupabaseAccessToken } from "./utils/auth/generateSupabaseAccessToken";
import type { NextAuthConfig } from "next-auth";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;

      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };

        session.supabaseAccessToken = await generateSupabaseAccessToken(payload, signingSecret);
      }

      return session;
    },
  },
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }),
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
