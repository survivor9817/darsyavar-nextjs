"use client";
import * as React from "react";
import { getBookById, type BookOption } from "@/app/data/booksData";
import { cn } from "@/lib/utils";
import { useBookContext } from "@/app/hooks/BookProvider";
import { useBookSelectData } from "@/app/hooks/useBookSelectData";
import ErrorFallback from "./error-fallback";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type BookSelectProps = {
  className?: string;
  label?: string;
};

const BookSelect = ({ className, label = "فهرست کتاب" }: BookSelectProps) => {
  const { currentBook, setCurrentBook } = useBookContext();
  const { options, isLoading, error, loadOptions } = useBookSelectData();

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const hasValue = Boolean(currentBook?.value);
  const isFloating = hasValue || open || inputValue.length > 0;

  const handleSelect = (value: string | null) => {
    if (!value) return;

    const selected = options?.find((opt) => opt.value === value);
    if (selected) {
      setCurrentBook(getBookById(selected.value));
    }
    setOpen(false);
    setInputValue("");
  };

  return (
    <div className={cn("relative mt-10 w-73", className)}>
      <Combobox
        open={open}
        onOpenChange={setOpen}
        value={currentBook?.value ?? ""}
        onValueChange={handleSelect}
        inputValue={inputValue}
        onInputValueChange={setInputValue} // ← اینجا
      >
        {/* Floating Label */}
        <label
          className={cn(
            "pointer-events-none absolute right-3 z-10 origin-right px-1 transition-all duration-200 ease-out",
            "bg-[#ebebeb] font-bold text-[#1a73e8]",
            isFloating
              ? "-top-2.5 text-xs scale-90"
              : "top-1/2 -translate-y-1/2 text-base scale-100",
            isLoading && "opacity-50",
          )}
        >
          {label}
        </label>

        <ComboboxInput
          placeholder={isLoading ? "در حال بارگذاری کتاب‌ها..." : ""}
          disabled={isLoading}
          className={cn(
            "h-[46px] w-full rounded-lg border-2 border-[rgb(200,200,200)] bg-[#ebebeb]",
            "px-3 text-center text-base font-black",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            isLoading && "cursor-wait opacity-70",
          )}
        />

        <ComboboxContent className="w-(--anchor-width) p-0" dir="rtl">
          <ComboboxList>
            {error ? (
              <div className="p-3">
                <ErrorFallback onRefetch={() => loadOptions()} />
              </div>
            ) : (
              <>
                <ComboboxEmpty>
                  {inputValue ? `هیچ کتابی با "${inputValue}" پیدا نشد` : "کتابی موجود نیست"}
                </ComboboxEmpty>

                {options?.map((book) => (
                  <ComboboxItem
                    key={book.value}
                    value={book.value}
                    className="justify-center font-bold"
                  >
                    {book.label}
                  </ComboboxItem>
                ))}
              </>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default BookSelect;
