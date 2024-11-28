import { AuthForm } from "@/components/AuthForm";
import { auth } from "@/auth";
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await auth()

  if(session) {
    redirect(`/dashboard`)
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <AuthForm />
    </div>
  );
}
