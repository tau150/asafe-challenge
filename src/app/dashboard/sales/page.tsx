'use client'
import { useState, useEffect } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Pagination, Title } from "@/components/ui";
import { API } from "@/services/salesApi";
import { SalesTable, SalesTableSkeleton} from "@/components/SalesTable";
import { Sale } from "@/domain";
import { useFetch } from '@/hooks/useFetch';
import { Error } from '@/components/ui';

const PAGINATION_LIMIT = 15

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const { callRequest, data, isLoading, error } = useFetch<{ sales: Sale[]; count: number }>(
    () => API.getAllSales(String(currentPage), String(PAGINATION_LIMIT))
  );

  const handleReTry = () => {
    callRequest()
  }

  useEffect(() => {
    callRequest()
  }, [currentPage])

  const showLoading = isLoading && !data?.sales

  if(error){

    return (
      <div className='h-full flex justify-center items-center'>
        <Card className="w-full lg:max-w-[40%] mt-4 flex flex-col bg-slate-50 p-4">
          <CardHeader className="bg-white rounded-t-md">
            <CardTitle className='text-center'>Something went wrong</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center flex-grow overflow-y-auto bg-white rounded-b-md">
            <Error
              className='my-4'
              variant="error"
              description="There was a problem getting sales data."
            />
            <Button
            className='w-40'
            onClick={handleReTry}
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <section className="p-10">
    <div className="flex justify-center mt-4">
      <Title>All sales</Title>
    </div>
    {showLoading ? <SalesTableSkeleton/> : <SalesTable data={data?.sales as Sale[]}/>}
    <section className="mt-6">
      <div>
        <Pagination
          isDisabled={showLoading}
          currentPage={currentPage}
          totalPages={Math.floor(data?.count || 1000 / PAGINATION_LIMIT)}
          onPageChange={setCurrentPage}
        />
      </div>
      </section>
  </section>

  )
}