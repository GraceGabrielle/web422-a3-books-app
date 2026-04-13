import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);

  const router = useRouter();

  // Build queryString exactly like the assignment requires
  let queryString = { ...router.query };
  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(" AND ");
  }

  // SWR fetch using q=
  const { data, error } = useSWR(
    qParts.length > 0
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(
          queryString
        )}&page=${page}&limit=10`
      : null
  );

  useEffect(() => {
    if (data) setPageData(data);
  }, [data]);

  // reset page to 1 whenever the query changes
  useEffect(() => {
    setPage(1);
  }, [router.query]);

  function previous() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    setPage(page + 1);
  }

  // Build subtext (key=value pairs)
  const subtext =
    Object.keys(router.query).length > 0
      ? Object.keys(router.query)
          .map((key) => `${key}: ${router.query[key]}`)
          .join(" | ")
      : "";

  if (error) {
    return (
      <>
        <PageHeader text="Search Results" subtext="Failed to load data." />
        <p>Failed to load data.</p>
      </>
    );
  }

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />

      {!qParts.length && <p>Please go back to the Home page and perform a search.</p>}

      {qParts.length > 0 && (
        <>
          <Table striped hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {pageData?.docs?.map((book) => (
                <tr
                  key={book.key}
                  onClick={() => router.push(book.key)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{book.title}</td>
                  <td>{book.first_publish_year ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={previous} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={next} />
          </Pagination>
        </>
      )}
    </>
  );
}