import Image from "next/image";
import { Grid } from "@/components/grid";
import { LoginFooter } from "@/modules/auth/login-footer";
import ForgotPasswordForm from "@/modules/auth/forgot-password";

export default function LoginPage() {
  return (
    <main className="relative flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8 h-dvh">
      <Image src="/images/cover.jpg" alt="" className="object-cover" fill />
      <Grid />
      <ForgotPasswordForm />
      <LoginFooter />
    </main>
  );
}

LoginPage.title = "Carbon Chain | Forgot Password";
