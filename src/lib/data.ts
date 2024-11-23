import { createClient } from "@/utils/supabase/server";
import { type Sale, type TopSellingProduct } from "./domain";

const supabase = createClient();

export async function getTopSellingProducts(): Promise<TopSellingProduct[]> {
  try {
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

    type SaleWithProduct = Sale & { product: { name: string } };

    const salesData = data as unknown as SaleWithProduct[];

    const aggregatedData = salesData.reduce<Record<string, number>>((acc, sale) => {
      const productName = sale.product.name;

      acc[productName] = (acc[productName] || 0) + sale.quantity;

      return acc;
    }, {});

    const topSellingProducts: TopSellingProduct[] = Object.entries(aggregatedData)
      .map(([name, totalSold]) => ({ name, totalSold }))
      .sort((a, b) => b.totalSold - a.totalSold);

    return topSellingProducts;
  } catch (err) {
    console.error("Error fetching top-selling products:", err);

    return [];
  }
}
