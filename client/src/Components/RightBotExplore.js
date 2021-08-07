import React from "react";
import { Col, Card } from "react-bootstrap";
import "../Style/RightBotFeed.css";

import image from "../Images/Rectangle 6.png";
import image1 from "../Images/Rectangle 5.png";
import image2 from "../Images/Rectangle 10.png";
import image3 from "../Images/Rectangle 3.png";
import image4 from "../Images/Rectangle 9.png";
import image5 from "../Images/Rectangle 4.png";
import image6 from "../Images/Rectangle 8.png";
import image7 from "../Images/Rectangle 12.png";

function RightBotExplore() {
  return (
    <div className="masonry-holder">
      <Col md={4}>
        <Card style={{ width: "23rem" }} className="card-feed">
          <Card.Img variant="top" className="img-feed" src={image} />
          <Card.Body></Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card style={{ width: "23rem" }} className="card-feed">
          <Card.Img variant="top" className="img-feed" src={image1} />
          <Card.Body></Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card style={{ width: "23rem" }} className="card-feed">
          <Card.Img variant="top" className="img-feed" src={image2} />
          <Card.Body></Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card style={{ width: "23rem" }} className="card-feed">
          <Card.Img variant="top" className="img-feed" src={image3} />
          <Card.Body></Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card style={{ width: "23rem" }} className="card-feed">
          <Card.Img variant="top" className="img-feed" src={image4} />
          <Card.Body></Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card style={{ width: "23rem" }} className="card-feed">
          <Card.Img variant="top" className="img-feed" src={image5} />
          <Card.Body></Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card style={{ width: "23rem" }} className="card-feed">
          <Card.Img variant="top" className="img-feed" src={image6} />
          <Card.Body></Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card style={{ width: "23rem" }} className="card-feed">
          <Card.Img variant="top" className="img-feed" src={image7} />
          <Card.Body></Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default RightBotExplore;
