import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";

function Dashboard(props) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [relative, setRelative] = useState("");
  const [err, seterr] = useState("");
  const [info, setInfo] = useState("");

  const { user } = props;
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 0) {
      return seterr("Cannot be empty");
    }
    const db = getDatabase();
    const postListRef = ref(db, "phonebook");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      username: name,
      phoneNumber: phone,
      relation: relative,
      userId: user,
    }).then(() => {
      setPhone("");
      setName("");
      setRelative("");
    });
  };

  //modals
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let infoafterload = [];
    setInfo("");
    const db = getDatabase();
    const groupRef = ref(db, "phonebook");
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        let infoItem = {
          id: item.key,
          name: item.val().username,
          phone: item.val().phoneNumber,
          relation: item.val().relation,
        };
        infoafterload.push(infoItem);
      });
      setInfo(infoafterload);
    });
  }, []);

  return (
    <Container>
      <div className="d-flex justify-center my-32">
        <Button variant="primary" onClick={handleShow}>
          Add
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="relative">
                <Form.Label>Friend or Relative</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State your relation"
                  onChange={(e) => setRelative(e.target.value)}
                  value={relative}
                  required
                />
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {info.length > 0 ? (
        <>
          <div className="d-flex flex-wrap gap-x-10">
            {" "}
            {info.map((i, k) => {
              return (
                <div className="d-flex gap-x-3 my-4 shadow-lg p-2" key={k}>
                  <h2>{k}</h2>
                  <div>
                    <p>Phone: {i.phone}</p>
                    <p>Name: {i.name}</p>
                    <p>Relation: {i.relation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        "No contacts :P"
      )}
    </Container>
  );
}

export default Dashboard;
