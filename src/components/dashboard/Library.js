import { EditFilled } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import { api } from "../../utils/api";
import Loading from "../Loading";

const EditButton = ({ onClick }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Edit book details</Tooltip>}
    >
      <span className="float-end">
        <Badge
          onClick={onClick}
          pill
          variant="primary"
          style={{ cursor: "pointer" }}
        >
          <EditFilled />
        </Badge>
      </span>
    </OverlayTrigger>
  );
};

const EditBookModel = ({ show, handleClose, book, setbook, reloadBooks }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setbook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditBook = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    api
      .post(
        "/editbook",
        { book: book },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handleClose();
        reloadBooks();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit book.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Row className="gap-3">
            <Form onSubmit={handleEditBook}>
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
                  row={5}
                  value={book.description}
                  placeholder="Add a description..."
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Edit book
              </Button>
              <Button
                variant="secondary"
                className="mx-3"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Form>
          </Row>
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default function Library() {
  const [books, setbooks] = useState([]);
  const [toggleEditBookModal, settoggleEditBookModal] = useState(false);
  const [editBook, seteditBook] = useState({});
  const [bookName, setbookName] = useState("");
  const { user } = useContext(UserContext);

  const getBooks = () => {
    const token = localStorage.getItem("token");
    api
      .get("/books", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setbooks(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  const searchBooks = (e) => {
    e.preventDefault();

    api
      .post("searchbooksbyname", { query: bookName })
      .then((books) => {
        setbooks(books.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      {books.length === 0 ? (
        <Loading />
      ) : (
        <Row>
          <Col md={7}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter book name"
                aria-label="book name"
                aria-describedby="book name"
                name="book name"
                value={bookName}
                onChange={(e) => setbookName(e.target.value)}
              />
              <Button variant="secondary" id="book name" onClick={searchBooks}>
                Search
              </Button>
            </InputGroup>
          </Col>
          {books.map((book) => (
            <Col key={book._id} md={6} className="py-2">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <span>{book.name}</span>
                    {user.isAdmin && (
                      <EditButton
                        onClick={() => {
                          if (!toggleEditBookModal) seteditBook(book);
                          settoggleEditBookModal(!toggleEditBookModal);
                        }}
                      />
                    )}
                  </Card.Title>
                  <Card.Subtitle className="text-muted mb-2">
                    {book.author}
                  </Card.Subtitle>
                  <Card.Text>
                    <Badge bg={book.quantity >= 5 ? "primary" : "danger"}>
                      Quantity: {book.quantity}
                    </Badge>{" "}
                    <Badge bg="warning">Edition: {book.edition}</Badge>{" "}
                    <Badge bg="success">Price: {book.price}</Badge>
                  </Card.Text>
                  {book.description && (
                    <Card.Text>{book.description}</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
          <EditBookModel
            show={toggleEditBookModal}
            handleClose={() => settoggleEditBookModal(false)}
            book={editBook}
            setbook={seteditBook}
            reloadBooks={getBooks}
          />
        </Row>
      )}
    </div>
  );
}
