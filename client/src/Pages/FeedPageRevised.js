import React from "react";
import { Row, Col } from "react-bootstrap";
import ProfileFeed from "../Components/ProfileFeed";
import RightBotFeed from "../Components/RightBotFeed";
import NavbarFeed from "../Components/NavbarFeed";

function FeedPageRevised() {
  return (
    <div>
      <Row>
        <Col lg={5} className="profile" fixed="top">
          <br />
          <ProfileFeed />
        </Col>

        <Col lg={7} className="feed">
          {/* <NavbarFeed /> */}
          <RightBotFeed />
        </Col>
      </Row>
    </div>
  );
}

export default FeedPageRevised;
