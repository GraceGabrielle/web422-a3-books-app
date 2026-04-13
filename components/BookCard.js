import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  // If error OR no data returned -> 404 (as per instructions)
  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <Card>
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null; // prevent infinite loop
          event.target.src =
            "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        className="img-fluid w-100"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Cover Image"
      />

      <Card.Body>
        <Card.Title>{data?.title ? data.title : ""}</Card.Title>

        <Card.Text>
          {data?.first_publish_date ? data.first_publish_date : "N/A"}
        </Card.Text>

        <Link href={`/works/${workId}`} passHref legacyBehavior>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}