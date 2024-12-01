import { createClient } from "@/utils/supabase/server";
import { auth } from "@/auth";
import type { TopSalesProduct, Product, Sale } from "@/domain";

const STOCK_LIMIT = 10;

async function getLowStockProducts(): Promise<Product[]> {
  try {
    const session = await auth();
    const supabase = createClient(session?.supabaseAccessToken as string);

    const { data, error } = await supabase.from("products").select("*").lte("stock", STOCK_LIMIT);

    // delay to represent streaming loading
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (error) {
      throw new Error(error.message);
    }

    return Promise.resolve(data || []);
  } catch (error: unknown) {
    throw error;
  }
  // Originally the idea was to call the api to take care of these tasks, but for some reasons it was impossible to get session server side in api routes
  // return fetcher("/api/products/stock");
}

async function getTopSales(): Promise<TopSalesProduct[]> {
  const session = await auth();
  const supabase = createClient(session?.supabaseAccessToken as string);

  try {
    const { data, error } = await supabase.from("sales").select(`
      id,
      product_id,
      sale_date,
      quantity,
      product:products!inner ( name )
    `);

    // delay to represent streaming loading
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (error) {
      throw new Error(error.message);
    }

    type SaleWithProduct = Sale & { product: { name: string } };

    const salesData = data as unknown as SaleWithProduct[];

    const aggregatedData = salesData.reduce<Record<string, number>>((acc, sale) => {
      const productName = sale.product.name;

      acc[productName] = (acc[productName] || 0) + sale.quantity;

      return acc;
    }, {});

    const topSalesProducts: TopSalesProduct[] = Object.entries(aggregatedData)
      .map(([name, totalSold]) => ({ name, totalSold }))
      .sort((a, b) => b.totalSold - a.totalSold);

    return Promise.resolve(topSalesProducts);
  } catch (error: unknown) {
    throw error;
  }
  // Check comment above
  // return fetcher("/api/sales/top");
}

export const API = {
  getTopSales,
  getLowStockProducts,
};
