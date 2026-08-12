"use client";
import { useChooseBook } from "@/hooks/useChooseBook";
import AuthInModal from "./auth-in-modal";
import BookShelf from "./book-shelf";

const LandingNavbar = () => {
  const {
    grades,
    fields,
    selectedGrade,
    setSelectedGrade,
    selectedField,
    setSelectedField,
    filteredBooks,
  } = useChooseBook();

  return (
    <>
      <div
        className="flex mx-2 justify-between gap-4 border-2 border-t-0 
                    rounded-b-3xl bg-[#eee] border-[#bcbcbc] h-14"
      >
        <div className="flex justify-center gap-4 mx-1">
          <a href="#" className="flex items-center mr-2 ">
            <i className="msr text-[32px]">school</i>

            <div className="text-2xl my-1 px-2 rounded-3xl border-[#bcbcbc] ">درس‌یاور</div>
          </a>
        </div>
        <div className="flex gap-4 mx-1">
          <AuthInModal />
        </div>
      </div>
      <BookShelf books={filteredBooks} />
    </>
  );
};

export default LandingNavbar;
