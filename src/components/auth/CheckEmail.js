import { Button, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../utils/api";

function CheckEmail({ email, setemail, setisEmailVerified }) {
  const checkEmail = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    api
      .post(
        "/auth/isuser",
        { email: email },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.isUser) {
          setisEmailVerified(true);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <Col xs={9} md={6} lg={5}>
      <Form onSubmit={checkEmail}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <b>Enter student's email ID</b>
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Find Student
        </Button>
      </Form>
    </Col>
  );
}

export default CheckEmail;
