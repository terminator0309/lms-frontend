import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import IssuedBookCard from "../Card/IssuedBookCard";

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
        setbooksIssued(res.data.booksIssued);
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
        <Row>
          {booksIssued.map((book) => (
            <Col key={book._id} md={6} className=" mt-3">
              <IssuedBookCard book={book} isReturn={false} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
