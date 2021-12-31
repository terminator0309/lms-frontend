import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { api } from "../../utils/api";

export default function MakeAdmin() {
  const [email, setemail] = useState("");

  const handleMakeAdmin = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    api
      .post(
        "/auth/makeadmin",
        { email: email },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Col xs={9} md={6} lg={5}>
      <Form onSubmit={handleMakeAdmin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <b>Enter email ID</b>
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Make admin
        </Button>
      </Form>
    </Col>
  );
}
