import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  const quoteStyles = {
    position: "absolute",
    zIndex: -100,
    height: "150px",
    width: "150px",
    top: -70,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  };
  return (
    <Container className="vh-100">
      <Row className="align-items-center" style={{ height: "50px" }}>
        <Col xs={1} md={1}>
          <img
            src="/Logo.svg"
            alt="logo"
            style={{ height: "100%", width: "50px", padding: "10px 0" }}
          />
        </Col>
        <Col xs={11} md={4}>
          <strong>Library Management System</strong>
        </Col>
      </Row>
      <Row className="fill align-items-center">
        <Row className="align-items-center justify-content-center">
          <Col>
            <Row className="flex-column justify-content-center">
              <Col>
                <h1 className="position-relative">
                  <img src="/quotes.svg" alt="Quotes" style={quoteStyles} />
                  <b>
                    I do believe something very magical can happen when you read
                    a good book.
                  </b>
                </h1>
              </Col>
              <Col>
                <h5>
                  <i className="text-muted float-end pe-4">- J.K. Rowling</i>
                </h5>
              </Col>
              <Col>
                <Row xs="auto" className="align-items-start mt-5">
                  <Col>
                    <Link to="/auth/signup">
                      <Button variant="primary" className="px-3" size="lg">
                        Sign up
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/auth/login">
                      <Button
                        variant="outline-primary"
                        className="px-3"
                        size="lg"
                      >
                        Log in
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <img
              src="/landing_illustration.svg"
              alt="landing Illustration"
              style={{ height: "100%", width: "100%" }}
            />
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
