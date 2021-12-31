import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import { convertDate, returnDateOfBook } from "../../utils/date";

export default function BooksIssued() {
  const [booksIssued, setbooksIssued] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setloading(true);
    api
      .get("/booksissued", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setbooksIssued(res.data);
        setloading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  }, []);

  return (
    <>
      {booksIssued.length === 0 || loading ? (
        <h1> No books issued </h1>
      ) : (
        booksIssued.map((book) => (
          <Col key={book._id} md={6} className="py-2">
            <Card>
              <Card.Body>
                <Card.Title>{book.bookId.name}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                  {book.bookId.author}
                </Card.Subtitle>
                <Card.Text>
                  Issued On: {convertDate(book.issuedDate)}
                  <br />
                  Return Date: {returnDateOfBook(book.issuedDate)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </>
  );
}
