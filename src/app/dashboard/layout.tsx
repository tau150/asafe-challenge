"use client";

import { ChartArea, LogOut, TableProperties } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Routes } from "@/routes";
import { MenuItem } from "@/components/ui";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  return (
    <main className="flex h-screen ">
      <aside className="p-2 border-l-2 border-2 w-1/12 bg-white">
        <Image alt="logo" height={100} src="/asafe-logo.webp" width={100} />
        <section className="mt-4 flex flex-col gap-4">
          <Link href={Routes.DASHBOARD}>
            <MenuItem
              icon={<ChartArea className="w-4 h-4" />}
              isActive={pathName === Routes.DASHBOARD}
            >
              Resume
            </MenuItem>
          </Link>
          <Link href={Routes.SALES}>
            <MenuItem
              icon={<TableProperties className="w-4 h-4" />}
              isActive={pathName === Routes.SALES}
            >
              Sales
            </MenuItem>
          </Link>
          <MenuItem className="mt-10" icon={<LogOut className="w-4 h-4" />}>
            Log out
          </MenuItem>
        </section>
      </aside>
      <section>{children}</section>
    </main>
  );
}
