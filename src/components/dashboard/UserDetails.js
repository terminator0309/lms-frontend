import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import CheckEmail from "../auth/CheckEmail";
import IssuedBookCard from "../Card/IssuedBookCard";

export default function UserDetails() {
  const [email, setemail] = useState("");
  const [isEmailVerified, setisEmailVerified] = useState(false);
  const [user, setuser] = useState();
  const [records, setrecords] = useState([]);

  useEffect(() => {
    if (!isEmailVerified) return;

    const token = localStorage.getItem("token");

    api
      .post(
        "/auth/booksissuedbyuser",
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
        setrecords(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [isEmailVerified]);

  const resetDetails = () => {
    setemail("");
    setisEmailVerified(false);
    setuser(null);
    setrecords(null);
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
                <Col key={book._id} md={6} className=" mt-3">
                  <IssuedBookCard book={book} isReturn={false} />
                </Col>
              ))
            ) : (
              <Col>
                <h2>No book is currently issued</h2>
              </Col>
            )}
            <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>
              User Record:
            </h2>
            {records.length > 0 && (
              <Table striped bordered>
                <thead>
                  <th>#</th>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Issue date</th>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{record.bookId.name}</td>
                      <td>{record.bookId.author}</td>
                      <td>{record.issueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Row>
        </>
      )}
    </>
  );
}
