import NextAuth from "next-auth";
import type { NextAuthConfig } from 'next-auth';
import GitHubProvider from "next-auth/providers/github"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? '',
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  }),
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

