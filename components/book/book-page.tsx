"use client";
import { useBookContext } from "@/app/hooks/BookProvider";
import { useBookPageScroll } from "@/app/hooks/useBookPageScroll";
import { toFaDigits } from "@/lib/toFaDigits";
import { useBookPageData } from "@/app/hooks/useBookPageData";
import BookPageSkeleton from "./book-page-skeleton";
import ErrorFallback from "./error-fallback";
import UnavailableBookError from "./unavailable-book-error";

const BookPage = () => {
  const { currentBook, currentPage } = useBookContext();

  const { pageRef } = useBookPageScroll([currentBook, currentPage]);
  const { pageContent, isLoading, error, loadPageContent } = useBookPageData();

  if (!currentBook || !currentPage) return <UnavailableBookError />;
  if (isLoading) return <BookPageSkeleton />;
  if (error) {
    return (
      <div className="h-full grid place-items-center">
        <ErrorFallback onRefetch={loadPageContent} />
      </div>
    );
  }

  const pageNum = toFaDigits(currentPage);
  return (
    <section
      ref={pageRef}
      // key={currentPage}
      id={`page${currentPage}`}
      className="page relative"
    >
      <div className="absolute top-0 left-0 bg-pink-400 m-1 p-2 rounded">{`${pageNum}`}</div>
      <div className="p-2 pt-8">
        <p>{pageContent}</p>
      </div>
    </section>
  );
};

export default BookPage;
