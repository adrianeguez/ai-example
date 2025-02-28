import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
  // Show max 5 page numbers, centered around current page
  const getVisiblePages = () => {
    const delta = 2
    const left = currentPage - delta
    const right = currentPage + delta + 1
    const rangeWithDots: (number | string)[] = []
    let l: number

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        rangeWithDots.push(i)
      } else if (i < left && rangeWithDots[rangeWithDots.length - 1] !== '...') {
        rangeWithDots.push('...')
      } else if (i >= right && rangeWithDots[rangeWithDots.length - 1] !== '...') {
        rangeWithDots.push('...')
      }
    }

    return rangeWithDots
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getVisiblePages().map((page, i) => (
        page === '...' ? (
          <span key={`dots-${i}`} className="px-3 py-2">...</span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => onPageChange(page as number)}
            className="min-w-[40px]"
          >
            {page}
          </Button>
        )
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  )
} 