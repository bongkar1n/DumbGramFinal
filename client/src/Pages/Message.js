import { Row, Col, Navbar, Card, Image } from "react-bootstrap";

import "../Style/Message.css";
import { Link } from "react-router-dom";

import DumbGram from "../Images/DumbGram.svg";
import egi from "../Images/Rectangle 5.png";
import NavbarMessage from "../Components/NavbarMessage";
import RightBotMessage from "../Components/RightBotMessage";

function Message() {
  return (
    <div>
      <Row>
        <Col lg={5} className="profile" fixed="top">
          <br />
          <Navbar className="bar">
            <Link to="/feed">
              <Image src={DumbGram} className="ms-5 mt-3 main-logo" alt="logo" />
            </Link>
          </Navbar>
          <Card className="bg-card text-center mt-3">
            <br /> <br />
            <div className="ms-auto"></div>
            <Card.Body>
              <Row>
                <Col className="bg-logo-profile">
                  <img src={egi} className="rounded-circle logo-profile-message" alt="logo" />
                </Col>
                <Col className="message-person">
                  <p className="top-message">Egi_lol</p>
                  <p className="bot-message">Hallo Lisa</p>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="bg-logo-profile">
                  <img src={egi} className="rounded-circle logo-profile-message" alt="logo" />
                </Col>
                <Col className="message-person">
                  <p className="top-message">Egi_lol</p>
                  <p className="bot-message">Hallo Lisa</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7} className="feed">
          <NavbarMessage />
          <RightBotMessage />
        </Col>
      </Row>
    </div>
  );
}

export default Message;
