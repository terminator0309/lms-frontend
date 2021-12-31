import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  Col,
  Card,
  Row,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { ShoppingTwoTone, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import CheckEmail from "../auth/CheckEmail";

function BooksModal({ show, handleClose, books, setbooks, reset, email }) {
  const handleIssue = () => {
    const token = localStorage.getItem("token");
    if (books.length === 0) return;

    api
      .post(
        "/issuebooks",
        { email: email, books: books },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status !== 200) {
          console.log("hey", res);
        }
        console.log(res);
        toast.success(res.data.message);
        reset();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      });
  };

  const removeBook = (bookId) => {
    setbooks(books.filter((book) => book._id !== bookId));
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {books.length > 0 ? (
            <ListGroup as="ol" numbered>
              {books.map((book) => (
                <ListGroup.Item
                  as="li"
                  key={book._id}
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{book.name}</div>
                    {book.author}
                  </div>
                  <Button onClick={() => removeBook(book._id)} variant="danger">
                    <div className="d-flex">
                      <DeleteOutlined style={{ color: "white" }} />
                    </div>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="text-muted">No book to be issued.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleIssue}
            disabled={!books.length}
          >
            Issue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function IssueBooks() {
  const [email, setemail] = useState("sandeep@user.com");
  const [isEmailVerified, setisEmailVerified] = useState(false);
  const [bookName, setbookName] = useState("");
  const [booksMatched, setbooksMatched] = useState([]);
  const [selectedBooks, setselectedBooks] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const [searched, setsearched] = useState(false);

  const findBooks = (e) => {
    e.preventDefault();

    api
      .post("searchbooksbyname", { query: bookName })
      .then((books) => {
        setbooksMatched(books.data);
        setsearched(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleSelect = (book) => {
    if (
      selectedBooks.filter((selectedBook) => selectedBook._id === book._id)
        .length === 0
    ) {
      setselectedBooks([...selectedBooks, book]);
    } else {
      toast.info("Book already selected!");
    }
  };

  const resetDetails = () => {
    setselectedBooks([]);
    setemail("");
    setisEmailVerified(false);
    settoggleModal(false);
    setbooksMatched([]);
  };

  return (
    <div>
      <div>
        {!isEmailVerified && (
          <CheckEmail
            email={email}
            setemail={setemail}
            setisEmailVerified={setisEmailVerified}
          />
        )}

        {isEmailVerified && (
          <>
            <h4>Current candidate: {email}</h4>
            <Button variant="warning" onClick={resetDetails}>
              Reset
            </Button>
            <Col xs={9} md={6} lg={5} className="mt-3">
              <Form onSubmit={findBooks}>
                <Form.Group className="mb-3" controlId="formBasicBookName">
                  <Form.Label>
                    <b>Enter book name </b>
                  </Form.Label>
                  <Form.Control
                    name="text"
                    type="text"
                    value={bookName}
                    onChange={(e) => setbookName(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!bookName.length}
                >
                  Find books
                </Button>
              </Form>
            </Col>

            {booksMatched.length > 0 ? (
              <>
                <Row className="mt-4">
                  <Row xs="auto" className="flex-row justify-content-between">
                    <Col>
                      <h4>Books found :</h4>
                    </Col>
                    <Col>
                      <ShoppingTwoTone
                        twoToneColor="orange"
                        style={{ fontSize: "40px" }}
                      />
                      <sup>
                        <Badge pill bg="primary">
                          {selectedBooks.length}
                        </Badge>
                      </sup>
                    </Col>
                  </Row>
                  {booksMatched.map((book) => (
                    <Col key={book._id} md={6} className="py-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>{book.name}</Card.Title>
                          <Card.Subtitle className="text-muted">
                            {book.author}
                          </Card.Subtitle>
                          <Card.Text>
                            <Badge
                              bg={book.quantity >= 5 ? "primary" : "danger"}
                            >
                              Quantity: {book.quantity}
                            </Badge>{" "}
                            <Badge bg="warning">Edition: {book.edition}</Badge>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            variant="outline-primary"
                            onClick={() => handleSelect(book)}
                          >
                            Issue
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Button
                  variant="success"
                  onClick={() => settoggleModal(!toggleModal)}
                >
                  Issue all
                </Button>
                <BooksModal
                  show={toggleModal}
                  handleClose={() => settoggleModal(false)}
                  books={selectedBooks}
                  setbooks={setselectedBooks}
                  email={email}
                  reset={resetDetails}
                />
              </>
            ) : (
              searched && <h1>No book found</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}
