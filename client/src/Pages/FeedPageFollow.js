import React from "react";
import { Row, Col } from "react-bootstrap";
import ProfileFeedFollow from "../Components/ProfileFeedFollow";
import RightBotFeed from "../Components/RightBotFeed";
import NavbarFeed from "../Components/NavbarFeed";

function FeedPageFollow() {
  return (
    <div>
      <Row>
        <Col lg={5} className="profile" fixed="top">
          <br />
          <ProfileFeedFollow />
        </Col>

        <Col lg={7} className="feed">
          <NavbarFeed />
          <RightBotFeed />
        </Col>
      </Row>
    </div>
  );
}

export default FeedPageFollow;
