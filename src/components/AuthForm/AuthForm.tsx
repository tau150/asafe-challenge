"use client";

import { Title, CustomCard, CardContent, CardDescription, CardHeader } from "@/components/ui";
import { GithubProvider } from "./components/GithubProvider";

export function AuthForm() {
  return (
    <CustomCard className="w-full max-w-md mx-auto">
      <CardHeader>
        <Title className="text-center">Welcome</Title>
        <CardDescription className="text-center">Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <GithubProvider />
        </div>
      </CardContent>
    </CustomCard>
  );
}
