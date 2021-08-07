import React from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../Style/ModalAndFormLogin.css";
import ModalLogin from "./ModalLogin";

import { API } from "../config/api";

function ModalRegister(props) {
  // Register
  const [modalRegShow, setModalRegShow] = useState(props.isOpen);
  const handleClose = () => setModalRegShow(false);

  // Login
  const [modalShow, setModalShow] = useState(false);
  const handleClickLogin = () => {
    setModalRegShow(!modalRegShow);
    setModalShow(!modalShow);
  };

  //Axios
  // const [users, setUsers] = useState([]);
  // const loadUsers = async () => {
  //   try {
  //     const response = await API.get("users");
  //     setUsers(response.data.data.users);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadUsers();
  // }, []);

  // error message

  const [message, setMessage] = useState("");
  const [, setRegister] = useState("");

  //Add User

  const [form, setForm] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
    image: "alternatif",
  });

  const { email, fullname, username, password, image } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ ...form });
      const response = await API.post("/register", body, config);

      if (response.data.status === "Validation Failed") {
        setMessage(response.data.message);
        setRegister("fail");
      } else if (response.data.status === "Failed") {
        setMessage(response.data.message);
        setRegister("fail");
      } else if (response.data.status === "success") {
        setMessage("Data Successfully Registered");
        setRegister("success");
        setTimeout(() => {
          handleClickLogin();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {modalShow ? <ModalLogin isOpen={true} /> : null}
      <Modal show={modalRegShow} onHide={handleClose} size="sm" aria-labelledby="contained-modal-title-vcenter " centered>
        <Modal.Header className="border-0 modal-header">
          <Modal.Title id="contained-modal-title-vcenter" className="color-white" style={{ color: "white" }}>
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleOnSubmit} className="ms-3 me-3">
            {message && (
              <div class="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control className="bg-dark text-light" onChange={handleOnChange} value={email} name="email" type="email" placeholder="Email" bordered />
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control className="bg-dark text-light" onChange={handleOnChange} value={fullname} name="fullname" type="text" placeholder="Full Name" bordered />
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control className="bg-dark text-light" onChange={handleOnChange} value={username} name="username" type="text" placeholder="Username" bordered />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control className="bg-dark text-light" onChange={handleOnChange} value={password} name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Button id="button-form-login" type="submit">
              Register
            </Button>

            <br />

            <h6 className="text-center mt-2 text-light ">
              Dont have an account? Klik{" "}
              <span className="here-to-register" onClick={handleClickLogin}>
                Here
              </span>
            </h6>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalRegister;
