import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookCard from "./book-card";
import { Book } from "@/data/booksData";
import Link from "next/link";

type Props = {
  books: Book[];
};

const BookShelf = ({ books }: Props) => {
  return (
    <Carousel
      className="w-full"
      dir={"rtl"}
      opts={{
        direction: "rtl",
        dragFree: true,

        // align: "start", // مهم برای شروع از لبه
        // slidesToScroll: 1, // میزان جابه‌جایی دلخواهت
      }}
    >
      <CarouselContent className="px-2">
        {books.map(({ coverImage, isAvailable, label }, index) => (
          <CarouselItem key={index} className="h-full my-2 basis-[45%] sm:basis-[22%]">
            <Link href={""}>
              <BookCard coverImage={coverImage} isAvailable={isAvailable} title={label} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex flex-row-reverse gap-2 mt-4">
        <CarouselNext className="static translate-y-0" />
        <CarouselPrevious className="static translate-y-0" />
      </div>
    </Carousel>
  );
};
export default BookShelf;
