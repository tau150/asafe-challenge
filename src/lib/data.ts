import { createClient } from "@/utils/supabase/server";
import { type Sale, type TopSalesProduct, type Product } from "./domain";

const supabase = createClient();
const STOCK_LIMIT = 10;

export async function getTopSalesProducts(): Promise<TopSalesProduct[]> {

    const { data, error } = await supabase.from("sales").select(`
      product_id,
      quantity,
      product:products!inner ( name )
      `);

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("No data returned from Supabase.");
    }

    // delay to represent streaming loading
    await new Promise(resolve => setTimeout(resolve, 2000))

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

    return topSalesProducts;
}

export async function getLowStockProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*").lte("stock", STOCK_LIMIT);


  // delay to represent streaming loading
  await new Promise(resolve => setTimeout(resolve, 3000))

  if (error) {
     throw new Error(error.message);
  }

  return data || [];
}
