import { API } from "@/services/dashboardApi";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { Skeleton } from "@/components/ui";
import { Title } from "@/components/ui";
import { Error } from "@/components/ui";

export async function ProductsStockCard() {
  try {
    const lowStockProducts = await API.getLowStockProducts();
    const lowStockProductsName = lowStockProducts.map((product) => product.name);

    return (
      <Card className="w-full lg:max-w-[40%] mt-4 flex flex-col bg-slate-50 p-4">
        <CardHeader className="bg-white rounded-t-md">
          <CardTitle>Products with low stock</CardTitle>
          <CardDescription>We will run out of stock soon</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow overflow-y-auto bg-white rounded-b-md">
          <Title alignment="center" as="h3" className="mt-4" color="primary" size="large">
            {lowStockProductsName.length}
          </Title>
          <div className="mt-12 lg:mt-auto">
            {lowStockProductsName.map((name) => (
              <p key={name} className="truncate text-neutral-500">
                {" "}
                - {name}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  } catch (e) {
    return (
      <Card className="w-full lg:max-w-[40%] mt-4 flex flex-col bg-slate-50 p-4">
        <CardHeader className="bg-white rounded-t-md">
          <CardTitle>Products with low stock</CardTitle>
          <CardDescription>We will run out of stock soon</CardDescription>
        </CardHeader>
        <CardContent className="bg-white rounded-b-md">
          <Error
            className="h-full"
            description="There was a problem getting stocks data."
            variant="error"
          />
        </CardContent>
      </Card>
    );
  }
}

export function ProductsStockCardSkeleton() {
  return (
    <Card className="w-full lg:max-w-[40%] mt-4 flex flex-col bg-slate-50 p-4 h-[300px] lg:h-[560px]">
      <CardHeader className="bg-white rounded-t-md pb-2">
        <Skeleton className="h-6 w-2/6" />
        <Skeleton className="h-6 w-1/6" />
      </CardHeader>
      <CardContent className="flex flex-col flex-grow overflow-y-auto bg-white rounded-b-md pt-6">
        <div className="flex justify-center">
          <Skeleton className="h-20 w-20" />
        </div>
        <div className="flex flex-col mt-12 lg:mt-auto gap-2">
          <Skeleton className="h-6 w-3/6" />
          <Skeleton className="h-6 w-4/6" />
        </div>
      </CardContent>
    </Card>
  );
}
