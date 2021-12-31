import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../utils/api";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("The password and confirmation password do not match.");
      return;
    }

    api
      .post("/auth/signup", {
        email: email,
        password: password,
        name: name,
      })
      .then((res) => {
        navigate("/auth/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="vh-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={9} md={6} lg={5} className="p-5 bg-light bg-gradient rounded">
          <Row className="gap-3">
            <h1>
              <b>Get Started.</b>
            </h1>
            <div className="text-muted">
              Already a user ? <Link to="/auth/login">Log in</Link>
            </div>
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>
                  <b>Name</b>
                </Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <b>Email address</b>
                </Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  <b>Password</b>
                </Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>
                  <b>Confirm Password</b>
                </Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Signup
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
