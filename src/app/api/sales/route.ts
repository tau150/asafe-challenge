import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from 'next/server';
import { Sale } from '@/domain';


const supabase = createClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') === 'undefined' ? '1': searchParams.get('page');
    const limit = searchParams.get('limit') === 'undefined' ? '20' : searchParams.get('limit') ;

    if (page && limit) {
      const sales = await getPaginatedSales(Number(page), Number(limit));
      return NextResponse.json(sales, { status: 200 });
    }
  } catch (error: any) {
    console.error('Error in /api/sales:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function getPaginatedSales(page: number, limit: number): Promise<{sales: Sale[], count: number}> {
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
  .from('sales')
  .select(`
    id,
    quantity,
    sale_date,
    product:products!inner(name)
  `, { count: 'exact' })
  .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(error.message);
  }


  return { sales: data || [], count: count ?? 0 }
}
