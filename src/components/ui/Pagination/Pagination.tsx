import * as React from "react"
import { ChevronLeft, ChevronRight, Heading1 } from 'lucide-react'
import { Button } from "../Button"
import { cn } from "@/utils/styles"
import { Skeleton } from "../Skeleton"

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  isDisabled: boolean;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  isDisabled,
  onPageChange,
  maxVisible = 5,
  className,
  ...props
}: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = []
    const halfVisible = Math.floor(maxVisible / 2)
    let start = Math.max(1, currentPage - halfVisible)
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div className={cn("flex items-center justify-center space-x-2", className)} {...props}>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isDisabled}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      {getPageNumbers().map((pageNumber) => (
        <Button
          key={pageNumber}
          disabled={isDisabled}
          variant={pageNumber === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isDisabled}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
    </div>
  );
}
