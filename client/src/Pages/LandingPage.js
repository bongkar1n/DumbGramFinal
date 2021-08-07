import React from "react";
import { useState, useEffect } from "react";
import { Container, Col, Row, Button, Image, Jumbotron } from "react-bootstrap";
import "../../src/Global.css";
import text from "../Images/DumbGram.png";
import image from "../Images/Rectangle 6.png";
import image1 from "../Images/Rectangle 5.png";
import image2 from "../Images/Rectangle 10.png";
import image3 from "../Images/Rectangle 3.png";
import image4 from "../Images/Rectangle 9.png";
import image5 from "../Images/Rectangle 4.png";
import image6 from "../Images/Rectangle 8.png";
import image7 from "../Images/Rectangle 12.png";
import ModalLogin from "../Components/ModalLogin";
import ModalRegister from "../Components/ModalRegister";
import "../Style/LandingPage.css";

function LandingPage() {
  const [modalShow, setModalShow] = useState(false);
  const handleClickLogin = () => setModalShow(!modalShow);

  const [modalRegShow, setModalRegShow] = useState(false);
  const handleClickRegister = () => setModalRegShow(!modalRegShow);

  return (
    <div>
      <Container>
        <Container>
          <Row>
            {/* ini adalah bagian kiri */}
            <Col lg={5} className="left-side">
              <Image id="dumbgram-text" src={text} alt="dumbgram logo" />
              <h3 id="landing-text">Share your best photos or videos</h3>
              <h5 id="landing-text-2">Join now, share your creations with another people and enjoy other creations.</h5>
              <div id="all-button">
                <Button id="button" onClick={handleClickLogin}>
                  Login
                </Button>
                <Button id="button-2" onClick={handleClickRegister}>
                  Register
                </Button>
                {modalShow ? <ModalLogin isOpen={modalShow} /> : null}
                {modalRegShow ? <ModalRegister isOpen={modalRegShow} /> : null}
              </div>
            </Col>
            {/* ini adalah bagian kanan */}
            <Col lg={7} className="right-side">
              <Row>
                <Col lg={4}>
                  <Image src={image} className="Rectagle1" alt="cant access image" />
                </Col>
                <Col lg={4}>
                  <Image src={image3} className="Rectagle2" alt="cant access image" />
                </Col>
                <Col lg={4}>
                  <Image src={image5} className="Rectagle3" alt="cant access image" />
                </Col>
                <Col lg={4}>
                  <Image src={image1} className="Rectagle4" alt="cant access image" />
                </Col>
                <Col lg={4}>
                  <Image src={image4} className="Rectagle5" alt="cant access image" />
                </Col>
                <Col lg={4}>
                  <Image src={image6} className="Rectagle6" alt="cant access image" />
                </Col>
                <Col lg={4}>
                  <Image src={image2} className="Rectagle7" alt="cant access image" />
                </Col>
                <Col lg={4}>
                  <Image src={image7} className="Rectagle8" alt="cant access image" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default LandingPage;
