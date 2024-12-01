import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Sale } from "@/domain";
import { auth } from "@/auth";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") === "undefined" ? "1" : searchParams.get("page");
    const limit = searchParams.get("limit") === "undefined" ? "20" : searchParams.get("limit");

    if (page && limit) {
      const sales = await getPaginatedSales(Number(page), Number(limit));

      return NextResponse.json(sales, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error in /api/sales:", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function getPaginatedSales(
  page: number,
  limit: number,
): Promise<{ sales: Sale[]; count: number }> {
  const offset = (page - 1) * limit;

  const session = await auth()
  const supabase = createClient(session?.supabaseAccessToken as string)


  const { data, error, count } = await supabase
    .from("sales")
    .select(
      `
    id,
    quantity,
    sale_date,
    product:products!inner(name)
  `,
      { count: "exact" },
    )
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(error.message);
  }

  const transformedData = (data || []).map((sale: any) => ({
    ...sale,
    product: Array.isArray(sale.product) ? sale.product[0] : sale.product,
  }));

  return { sales: transformedData,  count: count ?? 0 };
}
