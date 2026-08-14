// hooks/use-book-query.ts
"use client";
import { useQuery } from "@tanstack/react-query";

export function useBookQuery(bookId: string) {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBook(bookId), // فچ واقعی شما
  });
}
