import React from "react";
import { Badge, Button, Card, Col } from "react-bootstrap";

function IssuedBookCard({ book, isReturn, handleBookReturn }) {
  const calculateFine = (price, days) => {
    return (price / 100) * days;
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>{book.bookId.name}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          {book.bookId.author}
        </Card.Subtitle>
        <Card.Text>
          <Badge bg="info">Issued On: {book.issuedDate}</Badge>
          <br />
          {book.return && (
            <>
              <Badge bg={book.daysLate > 0 ? "warning" : "success"}>
                Return Date: {book.returnDate}
              </Badge>
              <br />
              {book.daysLate > 0 && (
                <>
                  <Badge
                    bg="danger"
                    style={{ fontSize: "1.05em", marginTop: "4px" }}
                  >
                    Fine: ₹{" "}
                    <i>{calculateFine(book.bookId.price, book.daysLate)}</i>
                  </Badge>{" "}
                </>
              )}
            </>
          )}
        </Card.Text>
        {isReturn && (
          <Button
            variant="primary"
            onClick={() => handleBookReturn(book.bookId._id)}
          >
            Accept Return
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default IssuedBookCard;
