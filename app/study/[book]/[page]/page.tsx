import { BookProvider } from "@/app/providers/book-provider";
import StudyTabs from "./study-tabs";
import { getBookById, getBookSelectOptions, isValidBookId } from "@/data/booksData";
import { fakeFetch } from "@/lib/fakeFetch";
import { getFehrestById } from "@/data/fehrestsData";

type Props = {
  params: Promise<{
    book: string;
    page: string;
  }>;
};

const StudyPage = async ({ params }: Props) => {
  const { book, page } = await params;

  const bookInfo = await fakeFetch(() => getBookById(book));
  const books = await fakeFetch(() => getBookSelectOptions(/** maybe purchased books by user id*/));
  const selectedBook = books.find((b) => b.value === book) ?? null;
  const currentFehrest = await fakeFetch(() => getFehrestById(isValidBookId(book) ? book : ""));
  // data:
  // selectedBook option.
  // selectedBookInfo.
  // table of contents.
  // page number.
  // page contents.

  // navigation:
  // changeBook.
  // changePage.

  return (
    <>
      <BookProvider value={{ books, selectedBook, page, bookInfo, currentFehrest }}>
        <StudyTabs />
      </BookProvider>
    </>
  );
};

export default StudyPage;
