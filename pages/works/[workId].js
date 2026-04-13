import { useRouter } from "next/router";
import useSWR from "swr";
import BookDetails from "@/components/BookDetails";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  // If SWR is still loading, return null (as per instructions)
  if (isLoading) return null;

  // If not loading, but error OR invalid data -> show default 404
  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader text={data.title} />
      <BookDetails book={data} workId={workId} />
    </>
  );
}
