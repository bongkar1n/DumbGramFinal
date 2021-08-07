import React from "react";
import ProfileFeed from "../Components/ProfileFeed";
import NavbarCreatePost from "../Components/NavbarCreatePost";
import RightBotCreatePost from "../Components/RightBotCreatePost";
import { Row, Col } from "react-bootstrap";

import "../Style/CreatePostRevised.css";

function CreatePostRevised() {
  return (
    <div>
      <Row>
        <Col lg={5} className="profile" fixed="top">
          <br />
          <ProfileFeed />
        </Col>

        <Col lg={7} className="feed">
          <NavbarCreatePost />
          <RightBotCreatePost />
        </Col>
      </Row>
    </div>
  );
}

export default CreatePostRevised;
