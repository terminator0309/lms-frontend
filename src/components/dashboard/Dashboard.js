import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { api } from "../../utils/api";
import { LinkContainer } from "react-router-bootstrap";
import "./Dashboard.css";

export default function Dashboard({ children, active }) {
  const { user, setuser } = useContext(UserContext);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");

      api
        .get("/auth/user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setuser(res.data);
          setloading(false);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
        });
    } else setloading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    toast.info("Logged out!");

    navigate("/");
    setuser(false);
  };

  if (loading) {
    return <></>;
  }

  return (
    <Container className="vh-100">
      <Row
        className="flex-row justify-content-center align-items-center"
        style={{ height: "80px" }}
      >
        <Col>
          <img
            src="/Logo.svg"
            alt="logo"
            style={{ height: "100%", width: "50px", padding: "10px 0" }}
          />
        </Col>
        <Col>
          <Button
            className="float-end"
            variant="outline-danger"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <h1>Welcome {user.name}</h1>
      <Card className="mt-4">
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey={active}>
            <Nav.Item>
              <LinkContainer to="/dashboard/popular">
                <Nav.Link eventKey="popular">Popular</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/dashboard/library">
                <Nav.Link eventKey="library">Library</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/dashboard/booksissued">
                <Nav.Link eventKey="booksissued">Books Issued</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            {user.isAdmin && (
              <>
                <Nav.Item>
                  <LinkContainer to="/dashboard/issuebooks">
                    <Nav.Link eventKey="issuebooks">Issue Books</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to="/dashboard/returnbooks">
                    <Nav.Link eventKey="returns">Returns</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to="/dashboard/addbook">
                    <Nav.Link eventKey="addbook">Add Book</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to="/dashboard/userdetails">
                    <Nav.Link eventKey="userdetails">User Details</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to="/dashboard/makeadmin">
                    <Nav.Link eventKey="makeadmin">Make admin</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card>
      <ToastContainer hideProgressBar transition={Slide} />
    </Container>
  );
}
