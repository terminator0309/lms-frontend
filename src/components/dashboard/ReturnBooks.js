import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import { convertDate, returnDateOfBook } from "../../utils/date";
import CheckEmail from "../auth/CheckEmail";

export default function ReturnBooks() {
  const [email, setemail] = useState("sandeep@user.com");
  const [isEmailVerified, setisEmailVerified] = useState(false);
  const [user, setuser] = useState();

  useEffect(() => {
    if (!isEmailVerified) return;

    const token = localStorage.getItem("token");

    api
      .post(
        "/auth/userdetails",
        { email: email },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setuser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [isEmailVerified]);

  const handleBookReturn = (bookId) => {
    const token = localStorage.getItem("token");
    api
      .post(
        "/bookreturn",
        { email: email, bookId: bookId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        const updatedBooksIssued = user.booksIssued.filter(
          (book) => book.bookId._id !== bookId
        );
        setuser((prevUserData) => ({
          ...prevUserData,
          booksIssued: updatedBooksIssued,
        }));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const resetDetails = () => {
    setemail("sandeep@user.com");
    setisEmailVerified(false);
    setuser(null);
  };
  return (
    <>
      {!isEmailVerified && (
        <CheckEmail
          email={email}
          setemail={setemail}
          setisEmailVerified={setisEmailVerified}
        />
      )}
      {isEmailVerified && user && (
        <>
          <h4>Current candidate: {email}</h4>
          <Button variant="warning" onClick={resetDetails}>
            Reset
          </Button>
          <Row>
            {user.booksIssued.length > 0 ? (
              user.booksIssued.map((book) => (
                <Col key={book._id} md={6} className="py-2 mt-3">
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
                      <Button
                        variant="primary"
                        onClick={() => handleBookReturn(book.bookId._id)}
                      >
                        Accept Return
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <h2>No issued books found</h2>
                <Button variant="warning" onClick={resetDetails}>
                  Go back
                </Button>
              </Col>
            )}
          </Row>
        </>
      )}
    </>
  );
}
