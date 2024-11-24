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
    <main className="flex">
      <aside className="flex flex-col p-2 border-l-2 border-2 lg:w-1/12 bg-white lg:min-h-screen">
        <div className="hidden lg:block" >
          <Image alt="logo" height={100} src="/asafe-logo.webp" width={100} />
        </div>
        <section className="mt-4 flex flex-col flex-grow gap-4">
          <Link href={Routes.DASHBOARD}>
            <div className={`lg:hidden p-2 rounded-md ${pathName === Routes.DASHBOARD ? "bg-accent-foreground text-accent" : ""} `}>
              <ChartArea className="w-3 h-3 " />
            </div>
            <MenuItem
              className="hidden lg:flex"
              icon={<ChartArea className="w-4 h-4" />}
              isActive={pathName === Routes.DASHBOARD}
            >
              Resume
            </MenuItem>
          </Link>
          <Link href={Routes.SALES}>
          <div className={`lg:hidden p-2 rounded-md ${pathName === Routes.SALES ? "bg-accent-foreground text-accent" : ""} `}>
            <TableProperties className="w-3 h-3" />
          </div>
          <MenuItem
            className="hidden lg:flex"
            icon={<TableProperties className="w-4 h-4" />}
            isActive={pathName === Routes.SALES}
          >
            Sales
          </MenuItem>
          </Link>
          <div className="lg:hidden flex justify-center mt-8">
            <LogOut className="w-3 h-3" />
          </div>
          <hr />
          <MenuItem className="hidden lg:mt-6 lg:flex" icon={<LogOut className="w-4 h-4" />}>
            Log out
          </MenuItem>
        </section>
      </aside>
      <section className="flex-grow">{children}</section>
    </main>
  );
}
