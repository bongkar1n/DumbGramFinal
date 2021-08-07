import React from "react";
import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalRegister from "./ModalRegister";

import "../../src/Global.css";
import "../Style/ModalAndFormLogin.css";
import { UserContext } from "../Context/UserContext";
import { API, setAuthToken } from "../config/api";

function ModalLogin(props) {
  const [, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleOnChangeLogin = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        email,
        password,
      });

      const response = await API.post("/login", body, config);

      setMessage(response.data.message);

      setAuthToken(response.data.data.user.token);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [modalShow, setModalShow] = useState(props.isOpen);
  const handleClose = () => setModalShow(false);

  // Register
  const [modalRegShow, setModalRegShow] = useState(false);
  const handleClickRegister = () => {
    setModalShow(!modalShow);
    setModalRegShow(!modalRegShow);
  };

  return (
    <div>
      {modalRegShow ? <ModalRegister isOpen={true} /> : null}
      <Modal show={modalShow} onHide={handleClose} size="sm" aria-labelledby="contained-modal-title-vcenter " centered>
        <Modal.Header className="border-0 modal-header">
          <Modal.Title id="contained-modal-title-vcenter" className="color-white" style={{ color: "white" }}>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleOnSubmitLogin} className="ms-3 me-3">
            {message && (
              <div class="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control className="bg-dark text-light" required onChange={handleOnChangeLogin} name="email" value={email} type="email" placeholder="Email" bordered />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control className="bg-dark text-light" required onChange={handleOnChangeLogin} name="password" value={password} type="password" placeholder="Password" />
            </Form.Group>
            <Button id="button-form-login" type="submit">
              Login
            </Button>

            <br />

            <h6 className="text-center mt-2 text-light ">
              Dont have an account? Klik{" "}
              <span className="here-to-register" onClick={handleClickRegister}>
                Here
              </span>
            </h6>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalLogin;
