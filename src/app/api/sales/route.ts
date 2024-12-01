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
  } catch (error: unknown) {
    const errorMessage = "unknown error";

    if (error instanceof Error) {
      console.error("Error in /api/sales:", error.message);
      error = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function getPaginatedSales(
  page: number,
  limit: number,
): Promise<{ sales: Sale[]; count: number }> {
  const offset = (page - 1) * limit;

  const session = await auth();
  const supabase = createClient(session?.supabaseAccessToken as string);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformedData = (data || []).map((sale: any) => ({
    ...sale,
    product: Array.isArray(sale.product) ? sale.product[0] : sale.product,
  }));

  return { sales: transformedData, count: count ?? 0 };
}
