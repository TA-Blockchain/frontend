import Image from "next/image";
import { Grid } from "@/components/grid";
import { RegisterCompany } from "@/modules/company/register-company";

export default function RegisterPage() {
  return (
    <main className="relative flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8 h-fit sm:h-dvh">
      <Image src="/images/cover.jpg" alt="" className="object-cover" fill />
      <Grid />

      <RegisterCompany />
    </main>
  );
}

RegisterPage.title = "Registrasi Perusahaan | Carbon Chain";
