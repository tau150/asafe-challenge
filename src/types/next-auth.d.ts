declare module "next-auth" {
  interface Session {
    supabaseAccessToken?: string;
  }
}
