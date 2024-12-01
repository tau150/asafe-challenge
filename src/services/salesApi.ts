import fetcher from "@/lib/fetcher";
import type { Sale } from "@/domain";

async function getAllSales(
  page?: string,
  limit?: string,
): Promise<{ sales: Sale[]; count: number }> {
  return fetcher(`/api/sales?page=${page}&limit=${limit}`);
}

export const API = {
  getAllSales,
};
