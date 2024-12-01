import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { auth } from "@/auth";
import { Routes } from "@/routes";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect(Routes.DASHBOARD);
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <AuthForm />
    </div>
  );
}
