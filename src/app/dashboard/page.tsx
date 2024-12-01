import { Suspense } from "react";
import { Title } from "@/components/ui";
import { SalesChartCard, SalesChartCardSkeleton } from "@/components/SalesChartCard";
import { ProductsStockCard, ProductsStockCardSkeleton } from "@/components/ProductsStockCard";

export default async function Dashboard() {
  return (
    <section className="p-10">
      <div className="flex justify-center mt-4">
        <Title>Main metrics</Title>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-12 mt-8">
        <Suspense fallback={<SalesChartCardSkeleton />}>
          <SalesChartCard />
        </Suspense>
        <Suspense fallback={<ProductsStockCardSkeleton />}>
          <ProductsStockCard />
        </Suspense>
      </div>
    </section>
  );
}
