import StudyTabs from "./study-tabs";

type Props = {
  params: Promise<{
    book: string;
    page: string;
  }>;
};

const StudyPage = async ({ params }: Props) => {
  const { book, page } = await params;
  return (
    <>
      <StudyTabs />
    </>
  );
};

export default StudyPage;
