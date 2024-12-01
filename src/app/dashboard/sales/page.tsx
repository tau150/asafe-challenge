"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Button,
  CustomCard,
  CardContent,
  CardHeader,
  CardTitle,
  Pagination,
  Title,
} from "@/components/ui";
import { API } from "@/services/salesApi";
import { SalesTable, SalesTableSkeleton } from "@/components/SalesTable";
import { Sale } from "@/domain";
import { useFetch } from "@/hooks/useFetch";
import { Error } from "@/components/ui";

const PAGINATION_LIMIT = 15;

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = useCallback(() => {
    return API.getAllSales(String(currentPage), String(PAGINATION_LIMIT));
  }, [currentPage]);

  const { callRequest, data, error, isLoading } = useFetch(fetchData);

  const handleReTry = () => {
    callRequest();
  };

  useEffect(() => {
    callRequest();
  }, [callRequest, currentPage]);

  const showLoading = isLoading && !data?.sales;

  if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <CustomCard className="w-full lg:max-w-[40%] mt-4 flex flex-col bg-slate-50 p-4">
          <CardHeader className="bg-white rounded-t-md">
            <CardTitle className="text-center">Something went wrong</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center flex-grow overflow-y-auto bg-white rounded-b-md">
            <Error
              className="my-4"
              description="There was a problem getting sales data."
              variant="error"
            />
            <Button className="w-40" onClick={handleReTry}>
              Try again
            </Button>
          </CardContent>
        </CustomCard>
      </div>
    );
  }

  return (
    <section className="p-10">
      <div className="flex justify-center mt-4">
        <Title>All sales</Title>
      </div>
      {showLoading ? <SalesTableSkeleton /> : <SalesTable data={data?.sales as Sale[]} />}
      <section className="mt-6">
        <div>
          <Pagination
            currentPage={currentPage}
            isDisabled={showLoading}
            totalPages={Math.floor(data?.count || 1000 / PAGINATION_LIMIT)}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </section>
  );
}
