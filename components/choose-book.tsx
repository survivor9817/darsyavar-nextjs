import Select, { type StylesConfig } from "react-select";
import BookSlider from "./BookSlider";
import BookCard from "./BookCard";
import GradeBtn from "./GradeBtn";
import type { Field } from "../data/booksData";
import { useChooseBook } from "@/hooks/useChooseBook";

const ChooseBook = () => {
  const {
    grades,
    fields,
    selectedGrade,
    setSelectedGrade,
    selectedField,
    setSelectedField,
    filteredBooks,
  } = useChooseBook();

  const selectCustomStyles: StylesConfig = {
    control: (provider) => ({
      ...provider,
      direction: "ltr",
      flexDirection: "row-reverse",
      textAlign: "center",
      width: "110px",
      borderRadius: "12px",
      height: "40px",
    }),
    indicatorsContainer: (provider) => ({
      ...provider,
      direction: "rtl",
    }),
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-lg md:text-xl lg:text-2xl">کتابت رو بردار و خواندن رو شروع کن</p>

        <div className="grid grid-cols-3 flex-wrap justify-center gap-2 w-75 sm:w-90 md:w-110 my-4 ">
          {grades.map((grade) => (
            <GradeBtn
              key={grade.id}
              isActive={selectedGrade.label === grade.label}
              onClick={() => setSelectedGrade(grade)}
            >
              {grade.label}
            </GradeBtn>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-6 mx-4">
        <span className="text-xl py-1">کتابخانه پایه {selectedGrade.label}</span>
        {selectedGrade.dore === "متوسطه دوم" ? (
          <Select
            styles={selectCustomStyles}
            className="basic-single "
            classNamePrefix="select"
            defaultValue={fields[0]}
            value={selectedField}
            isSearchable={false}
            options={fields}
            onChange={(field) => setSelectedField(field as Field)}
          />
        ) : null}
      </div>

      <BookSlider>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            title={book.label}
            coverImage={book.coverImage}
            isAvailable={book.isAvailable}
          />
        ))}
      </BookSlider>
    </>
  );
};

export default ChooseBook;
