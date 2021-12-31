import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../utils/api";

export default function AddBook() {
  const [book, setbook] = useState({
    name: "",
    author: "",
    edition: 1,
    price: 0,
    description: "",
    quantity: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setbook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    api
      .post(
        "/addbook",
        { ...book },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <Col xs={12} md={12} lg={10}>
      <Row className="gap-3">
        <h4>
          <b>Add new book.</b>
        </h4>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group
              as={Col}
              md={6}
              className="mb-3"
              controlId="formBasicName"
            >
              <Form.Label>
                <b>Book Name</b>
              </Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={book.name}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md={6}
              className="mb-3"
              controlId="formBasicAuthor"
            >
              <Form.Label>
                <b>Author Name</b>
              </Form.Label>
              <Form.Control
                name="author"
                type="text"
                value={book.author}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              md={4}
              className="mb-3"
              controlId="formBasicEdition"
            >
              <Form.Label>
                <b>Edition</b>
              </Form.Label>
              <Form.Control
                name="edition"
                type="number"
                value={book.edition}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md={4}
              className="mb-3"
              controlId="formBasicPrice"
            >
              <Form.Label>
                <b>Price</b>
              </Form.Label>
              <Form.Control
                name="price"
                type="number"
                value={book.price}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md={4}
              className="mb-3"
              controlId="formBasicQuantity"
            >
              <Form.Label>
                <b>Quantity</b>
              </Form.Label>
              <Form.Control
                name="quantity"
                type="number"
                value={book.quantity}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              row={3}
              value={book.description}
              placeholder="Add a description..."
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Add book
          </Button>
        </Form>
      </Row>
    </Col>
  );
}
