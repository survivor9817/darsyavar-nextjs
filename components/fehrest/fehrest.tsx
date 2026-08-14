import BookSelect from "./book-select";
import FehrestList from "./fehrest-list";

type Props = {};

const Fehrest = (props: Props) => {
  return (
    <div>
      <header className="flex justify-center">
        <BookSelect />
      </header>

      <ol className="mt-4">
        <FehrestList />
      </ol>
    </div>
  );
};

export default Fehrest;
