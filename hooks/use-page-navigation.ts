// hooks/use-page-navigation.ts
"use client";
import { useRouter } from "next/navigation";
import { useBookParams } from "./use-study-params";
import { useBookQuery } from "./use-book-query";

export function usePageNavigation() {
  const router = useRouter();
  const { bookId, page } = useBookParams();
  const { data: book } = useBookQuery(bookId);

  const isPageInRange = (p: number) => Number.isInteger(p) && p >= 1 && p <= (book?.lastPage ?? 1);

  const goToPage = (target: number) => {
    if (!isPageInRange(target)) return;
    router.push(`/study/${bookId}/${target}`); // navigation واقعیه، چون محتوای صفحه عوض می‌شه
  };

  const goToNextPage = () => goToPage(page + 1);
  const goToPrevPage = () => goToPage(page - 1);

  return { bookId, page, book, goToPage, goToNextPage, goToPrevPage, isPageInRange };
}

// // داخل خودِ کامپوننت page-input.tsx
// "use client";
// import { useState, useRef } from "react";
// import { toFaDigits, toEnDigits } from "@/lib/digits";
// import { usePageNavigation } from "@/hooks/use-page-navigation";

// export function PageInput() {
//   const { page, goToPage, isPageInRange } = usePageNavigation();
//   const [pageInput, setPageInput] = useState(toFaDigits(page));
//   const [pageInputError, setPageInputError] = useState(false);
//   const onFocusPageNumber = useRef(page);

//   // بقیه‌ی منطق (onFocus, onBlur, onInputKeyDown) دقیقاً همون قبلیه،
//   // فقط setCurrentPage قبلی رو با goToPage جایگزین کنید
// }
