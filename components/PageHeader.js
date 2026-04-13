import Card from "react-bootstrap/Card";

export default function PageHeader(props) {
  const { text, subtext } = props;

  return (
    <>
      <Card className="bg-light mb-4">
        <Card.Body>
          <h2 className="mb-0">{text}</h2>
          {subtext ? <p className="text-muted mt-2 mb-0">{subtext}</p> : null}
        </Card.Body>
      </Card>
    </>
  );
}