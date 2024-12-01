import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Sale, TopSalesProduct } from "@/domain";
import { auth } from "@/auth";

export async function GET() {
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

    return NextResponse.json(topSalesProducts, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "unknown error ";

    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error in /api/sales/top", errorMessage);
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
