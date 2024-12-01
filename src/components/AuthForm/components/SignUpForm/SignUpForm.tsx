"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/lib/zod";
import { Button, Label, Input } from "@/components/ui";
import { Error } from "@/components/ui";

export function SignUpForm() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
      // handle sign up
  };

  return (
    <div>
      {error && <Error
        className='my-4'
        variant="error"
        description={error}
      />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 mb-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" {...register("name")} />
        </div>
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}
