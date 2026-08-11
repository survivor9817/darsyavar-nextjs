type Props = {
  params: Promise<{
    book: string;
    page: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { book, page } = await params;
  return (
    <div>
      <div>page</div>
      <div>{book}</div>
      <div>{page}</div>
    </div>
  );
};

export default page;
