import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Product } from "@/domain";
import { auth  } from "@/auth";

const STOCK_LIMIT = "10";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") ?? STOCK_LIMIT;

    const products = await getLowStockProducts(Number(limit));

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/products/stock:", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getLowStockProducts(stockLimit = Number(STOCK_LIMIT)): Promise<Product[]> {
  const session = await auth()
  const supabase = createClient(session?.supabaseAccessToken as string)
  const { data, error } = await supabase.from("products").select("*").lte("stock", stockLimit);

  // delay to represent streaming loading
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
