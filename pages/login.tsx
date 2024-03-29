import Image from "next/image";
import { Grid } from "@/components/grid";
import { LoginForm } from "@/modules/login/login-form";
import { LoginFooter } from "@/modules/login/login-footer";

export default function LoginPage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8 h-dvh">
      <Image src="/images/cover.jpg" alt="" className="object-cover" fill />
      <Grid />
      <LoginForm />
      <LoginFooter />
    </main>
  );
}
