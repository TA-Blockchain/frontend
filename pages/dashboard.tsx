import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <main>
        <Link href="/marketplace">Marketplace</Link>
      </main>
    </>
  );
}

HomePage.title = "Dashboard | Carbon Chain";
