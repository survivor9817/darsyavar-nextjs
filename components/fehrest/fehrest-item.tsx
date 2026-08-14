"use client";
import { useFehrestItem } from "@/app/hooks/useFehrestItem";
import { FehrestSection } from "@/app/data/fehrestsData";
import { toFaDigits } from "@/lib/toFaDigits";
import { useBookContext } from "@/app/hooks/BookProvider";

type Props = {
  section: FehrestSection;
  currentSectionPage: number;
};

const FehrestItem = ({ section, currentSectionPage }: Props) => {
  const { goToPage } = useBookContext();
  const { isActive, handleClick } = useFehrestItem(currentSectionPage, section, goToPage);
  const isExpanded = isActive ? "max-h-screen" : "max-h-0";
  const isHighlighted = isActive ? "bg-[#e1a3c1]" : "hover:bg-[#e1a3c175]";

  const subitems = section.sections && section.sections?.length > 0 && (
    <ol
      className={`border-r-2 pr-1 mb-2 mr-3 overflow-hidden transition-[max-height] duration-300 ease-in-out ${isExpanded}`}
    >
      {section.sections.map((section) => {
        return (
          <FehrestItem
            key={section.title}
            section={section}
            currentSectionPage={currentSectionPage}
          />
        );
      })}
    </ol>
  );

  return (
    <li>
      <div
        className={`flex justify-between font-semibold py-1.25 px-2 pl-1 my-1 rounded cursor-pointer transition-colors duration-300 ${isHighlighted}`}
        onClick={handleClick}
      >
        <span className="h-full w-full my-auto text-sm truncate">{section.title}</span>
        <span className="flex justify-center w-7 h-full p-1 border-2 rounded text-xs">
          {toFaDigits(section.page)}
        </span>
      </div>

      {subitems}
    </li>
  );
};

export default FehrestItem;
