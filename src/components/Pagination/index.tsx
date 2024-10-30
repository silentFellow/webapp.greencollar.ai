"use client";

import { Button } from "@/components/ui/button";

function Pagination({
  pageNumber,
  hasNext,
  onNext,
  onPrev,
}: {
  pageNumber: number;
  hasNext: boolean;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!hasNext && pageNumber === 1) return null;

  return (
    <nav className="mt-10 flex w-full items-center justify-center gap-5">
      <Button onClick={onPrev} disabled={pageNumber === 1} aria-label="Previous Page">
        Prev
      </Button>
      <span aria-live="polite">{pageNumber}</span>
      <Button onClick={onNext} disabled={!hasNext} aria-label="Next Page">
        Next
      </Button>
    </nav>
  );
}

export default Pagination;
