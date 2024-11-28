'use client'
import { Title, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui"
import { Github } from 'lucide-react';
import { signIn } from "next-auth/react";


export function AuthForm() {

  const handleGithubSignIn = () => {
    signIn("github")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
         <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <Title className="text-center" as="h2">Sign in to Your Account</Title>
        <CardDescription className="text-center">
          Use your GitHub account to sign in quickly and securely.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          onClick={handleGithubSignIn}
          className="w-full max-w-xs"
        >
          <Github className="mr-2 h-4 w-4" />
          Sign in with GitHub
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have a GitHub account?{" "}
          <a
            href="https://github.com/join"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Create one
          </a>
        </p>
      </CardFooter>
    </Card>
    </Card>
  )
}

