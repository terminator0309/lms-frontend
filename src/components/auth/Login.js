import { useContext, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("sandeep@user.com");
  const [password, setpassword] = useState("sandeep");
  const { setuser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    api
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

        setuser(res.data.user);
        navigate("/dashboard/popular");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="vh-100 ">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={9} md={6} lg={5} className="p-5 rounded bg-white">
          <Row className="gap-3">
            <h1>
              <b>Welcome back.</b>
            </h1>
            <div className="text-muted">
              Not a user ? <Link to="/auth/signup">Sign Up</Link>
            </div>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <b>Email address</b>
                </Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
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
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Login
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
