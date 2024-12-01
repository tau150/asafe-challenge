"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { signInSchema } from "@/lib/zod";
import { Button, Label, Input } from "@/components/ui";

export function SignInForm() {
  const [isClient, setIsClient] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = (_values: z.infer<typeof signInSchema>) => {
    // handle sign in
  };

  if (!isClient) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="john@example.com" type="email" {...register("email")} />
        <p className="mt-2 ml-2 text-red-400 text-sm">{errors?.email?.message}</p>
      </div>
      <div className="space-y-2 mb-4">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        <p className="mt-2 ml-2 text-red-400 text-sm">{errors?.password?.message}</p>
      </div>
      <Button className="w-full" type="submit">
        Sign In
      </Button>
    </form>
  );
}
