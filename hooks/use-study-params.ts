// hooks/use-study-params.ts
"use client";
import { useParams } from "next/navigation";

export function useStudyParams() {
  const params = useParams<{ bookId: string; page: string }>();
  return {
    bookId: params.bookId,
    page: Number(params.page),
  };
}
