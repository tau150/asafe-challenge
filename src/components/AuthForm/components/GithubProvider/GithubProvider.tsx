"use client";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui";

export function GithubProvider() {
  const handleGithubSignIn = () => {
    signIn("github");
  };

  return (
    <div className="w-full max-w-md">
      <CardHeader>
        <CardDescription className="text-center">
          Use your GitHub account to sign in quickly and securely.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          className="w-full max-w-xs bg-black text-secondary"
          variant="outline"
          onClick={handleGithubSignIn}
        >
          <Github className="mr-2 h-4 w-4" />
          Sign in with GitHub
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center mb-0 pb-0">
        <p className="text-sm text-muted-foreground">
          Do not have a GitHub account?{" "}
          <a
            className="text-primary hover:underline"
            href="https://github.com/join"
            rel="noopener noreferrer"
            target="_blank"
          >
            Create one
          </a>
        </p>
      </CardFooter>
    </div>
  );
}
