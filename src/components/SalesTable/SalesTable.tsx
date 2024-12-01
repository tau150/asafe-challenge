"use client";
import { Skeleton } from "@/components/ui";
import { Sale } from "@/domain";

export function SalesTable({ data }: { data: Sale[] }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5 overflow-x-auto mt-12">
        <table className="min-w-full bg-white border border-gray-300 w[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Product Name</th>
              <th className="py-2 px-4 border-b text-left">Quantity</th>
              <th className="py-2 px-4 border-b text-left">Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{sale.product.name}</td>
                <td className="py-2 px-4 border-b">{sale.quantity}</td>
                <td className="py-2 px-4 border-b">{sale.sale_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SalesTableSkeleton() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5 overflow-x-auto mt-12">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-12" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>
      </div>
    </div>
  );
}
