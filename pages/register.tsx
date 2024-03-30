import Image from "next/image";
import { Grid } from "@/components/grid";
import { RegisterPerusahaan } from "@/modules/perusahaan/register-perusahaan";

export default function RegisterPage() {
  return (
    <main className="relative flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8 h-dvh">
      <Image src="/images/cover.jpg" alt="" className="object-cover" fill />
      <Grid />

      <RegisterPerusahaan />
    </main>
  );
}

RegisterPage.title = "Registrasi Perusahaan | Carbon Chain";
