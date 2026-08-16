// src/context/BookContext.tsx
"use client";

import { BookOption } from "@/data/booksData";
import { createContext, useContext, type ReactNode } from "react";

type BookParams = {
  books: BookOption[];
  selectedBook: BookOption | null;
};

type BookContextType = BookParams;

const BookContext = createContext<BookContextType | null>(null);

export const useBookContext = (): BookContextType => {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBookContext must be used within BookProvider");
  return ctx;
};

type Props = {
  children: ReactNode;
  value: BookParams;
};

export const BookProvider = ({ children, value }: Props) => {
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
