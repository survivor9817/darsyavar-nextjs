"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useBookParams } from "@/hooks/use-study-params";
import { useRouter, useSearchParams } from "next/navigation";
import type { BookOption } from "@/data/booksData";
import { useBookContext } from "@/app/providers/book-provider";

type BookSelectProps = {
  className?: string;
  label?: string;
};

const BookSelect = ({ className, label = "فهرست کتاب" }: BookSelectProps) => {
  const { books, selectedBook } = useBookContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookId } = useBookParams();

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setInputValue(selectedBook?.label ?? "");
    }
  }, [open, selectedBook?.label]);

  const filteredBooks = React.useMemo(() => {
    if (!books) return [];
    if (!inputValue || inputValue === selectedBook?.label) {
      return books;
    }
    const lowerQuery = inputValue.toLowerCase();
    return books.filter((book) => book.label.toLowerCase().includes(lowerQuery));
  }, [books, inputValue, selectedBook?.label]);

  const selectAllText = (inputElement: HTMLInputElement) => {
    setTimeout(() => {
      inputElement.select();
    }, 50);
  };

  const handleSelect = (value: BookOption | null) => {
    if (!value) return;

    if (value.value !== bookId) {
      const tab = searchParams.get("tab") ?? "book";
      router.push(`/study/${value.value}/1?tab=${tab}`);
    }

    setOpen(false);
  };

  const hasValue = Boolean(selectedBook);
  const isFloating = hasValue || open || inputValue.length > 0;

  return (
    <div className={cn("relative mt-10 w-73", className)}>
      <Combobox
        items={filteredBooks}
        value={selectedBook} // 👈 اضافه شد: تنظیم مقدار انتخاب‌شده برای تشخیص تیک
        isItemEqualToValue={(item, value) => item?.value === value?.value} // ← به‌جای by
        open={open}
        onOpenChange={setOpen}
        onValueChange={handleSelect}
        autoHighlight
      >
        <label
          className={cn(
            "pointer-events-none absolute right-5 z-10 origin-right px-2 transition-all duration-200 ease-out",
            "bg-[#ebebeb] font-bold",
            isFloating
              ? "-top-2 text-xs scale-90 bg-background"
              : "top-1/2 -translate-y-1/2 text-base scale-100",
          )}
        >
          {label}
        </label>

        <ComboboxInput
          value={open ? inputValue : (selectedBook?.label ?? "")}
          onFocus={(e) => selectAllText(e.target)}
          onClick={(e) => selectAllText(e.target as HTMLInputElement)}
          onChange={(e) => {
            if (!open) setOpen(true);
            setInputValue(e.target.value);
          }}
          placeholder="کتابی که می‌خوای رو انتخاب کن."
          className={cn(
            "h-11.5 w-full border-2 border-[rgb(200,200,200)] bg-background",
            "px-3 text-center text-base font-black cursor-pointer",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
        />

        <ComboboxContent className="w-(--anchor-width) p-0" dir="rtl">
          <ComboboxList>
            <ComboboxEmpty className="p-2 text-center text-sm font-bold text-gray-500">
              {inputValue ? `هیچ کتابی با "${inputValue}" پیدا نشد` : "کتابی موجود نیست"}
            </ComboboxEmpty>

            {filteredBooks.map((book) => (
              <ComboboxItem
                key={book.value}
                value={book}
                className="justify-center font-bold cursor-pointer"
              >
                {book.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default BookSelect;
