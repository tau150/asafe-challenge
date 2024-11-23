import { HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import { getTopSellingProducts } from "@/lib/data";
import { Button } from "@/components/ui";
import { MenuItem } from "@/components/ui";

export default async function Dashboard() {
  const topSellingProducts = await getTopSellingProducts();

  return <div>Resume</div>;
}
