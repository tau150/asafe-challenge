import fetcher from "@/lib/fetcher";
import type { TopSalesProduct, Product} from "@/domain";

async function getLowStockProducts(): Promise<Product[]> {
  return fetcher("/api/products/stock");
}


async function getTopSales(): Promise<TopSalesProduct[]>{
  return fetcher("/api/sales/top");
}

export const API = {
  getTopSales,
  getLowStockProducts
}
