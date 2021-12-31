import { useContext, useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { api } from "../../utils/api";
import Loading from "../Loading";

export default function Popular() {
  const [loading, setloading] = useState(true);
  const [books, setbooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/popularbooks", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setbooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {books.length == 0 ? (
        <Loading />
      ) : (
        <Row>
          {books.map((book) => (
            <Col key={book._id} md={6} className="py-2">
              <Card>
                <Card.Header>
                  <Badge bg="primary">Issued {book.count} times</Badge>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{book.bookId.name}</Card.Title>
                  <Card.Subtitle>{book.bookId.author}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
