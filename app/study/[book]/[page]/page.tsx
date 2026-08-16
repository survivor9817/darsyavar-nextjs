import { BookProvider } from "@/app/providers/book-provider";
import StudyTabs from "./study-tabs";
import { getBookSelectOptions } from "@/data/booksData";
import { fakeFetch } from "@/lib/fakeFetch";

type Props = {
  params: Promise<{
    book: string;
    page: string;
  }>;
};

const StudyPage = async ({ params }: Props) => {
  const { book, page } = await params;

  const books = await fakeFetch(() => getBookSelectOptions());
  const selectedBook = books.find((b) => b.value === book) ?? null;

  return (
    <>
      <BookProvider value={{ books, selectedBook }}>
        <StudyTabs />
      </BookProvider>
    </>
  );
};

export default StudyPage;
