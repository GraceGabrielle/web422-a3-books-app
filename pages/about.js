import Link from "next/link";
import Card from "react-bootstrap/Card";

import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer - Grace Gabrielle" />

      <p>
        Hi! My name is Grace Gabrielle. This app was built using Next.js, SWR,
        and React-Bootstrap, and it pulls data from the Open Library API.
      </p>

      <p>
        For this page, I selected a book from Open Library and fetched its data
        using <code>getStaticProps()</code>. You can explore books and find their
        Work IDs on{" "}
        <Link href="https://openlibrary.org/" target="_blank">
          openlibrary.org
        </Link>
        .
      </p>

      <Card className="mb-4">
        <Card.Body>
          <BookDetails book={props.book} workId="OL453657W" showFavouriteBtn={false} />
        </Card.Body>
      </Card>
    </>
  );
}

// This runs at build time (static generation)
export async function getStaticProps() {
  const workId = "OL453657W"; // change this to any Work ID you want
  const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
  const data = await res.json();

  return {
    props: {
      book: data,
    },
  };
}
