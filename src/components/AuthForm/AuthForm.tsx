"use client";

import {
  Title,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui";
import { GithubProvider } from "./components/GithubProvider";

export function AuthForm() {

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <Title className="text-center">Welcome</Title>
        <CardDescription className="text-center">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <GithubProvider />
        </div>
      </CardContent>
    </Card>
  );
}
