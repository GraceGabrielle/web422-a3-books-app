import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: "",
      title: "",
      subject: "",
      language: "",
      first_publish_year: "",
    },
  });

  function submitForm(data) {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      ),
    });
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          className={errors.author ? "is-invalid" : ""}
          {...register("author", { required: "Author is required." })}
        />
        {errors.author && (
          <div className="invalid-feedback">{errors.author.message}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" {...register("title")} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" {...register("subject")} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Language</Form.Label>
        <Form.Control type="text" {...register("language")} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>First Publish Year</Form.Label>
        <Form.Control type="text" {...register("first_publish_year")} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}