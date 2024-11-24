import { SalesChart } from "../SalesChart";
import { getTopSalesProducts } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { Skeleton } from "@/components/ui";
import { Error } from "@/components/ui";

export async function SalesChartCard() {
  try {
    const topSalesProducts = await getTopSalesProducts();
    const graphProps = topSalesProducts.reduce(
      (acc: { labels: string[]; values: number[] }, current) => {
        return {
          ...acc,
          labels: [...acc.labels, current.name],
          values: [...acc.values, current.totalSold],
        };
      },
      { labels: [], values: [] },
    );

    return (
        <Card className="w-full lg:w-[60%] mt-4 bg-slate-50 p-4">
          <CardHeader className="bg-white rounded-t-md">
            <CardTitle>Top Sales</CardTitle>
            <CardDescription>In the last one year period</CardDescription>
          </CardHeader>
          <CardContent className="bg-white rounded-b-md">
            <SalesChart data={{ ...graphProps }} />
          </CardContent>
        </Card>
    );

  }catch(e) {
    return (
      <Card className="w-full lg:w-[60%] mt-4 bg-slate-50 p-4">
      <CardHeader className="bg-white rounded-t-md">
        <CardTitle>Top Sales</CardTitle>
        <CardDescription>In the last one year period</CardDescription>
      </CardHeader>
      <CardContent className="bg-white rounded-b-md">
      <Error
        className="h-full"
        variant="error"
        description="There was a problem getting sales data."
      />
      </CardContent>
    </Card>
    )
  }
}

export function SalesChartCardSkeleton() {
  return (
    <Card className="w-full lg:w-[60%] mt-4 bg-slate-50 p-4 h-[300px] lg:h-[560px]">
      <CardHeader className="bg-white rounded-t-md pb-2">
        <Skeleton className="h-6 w-1/6" />
        <Skeleton className="h-6 w-2/6" />
      </CardHeader>
      <CardContent className="bg-white rounded-b-md pt-6">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <div className="flex gap-2 my-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      </CardContent>
    </Card>
  );
}
