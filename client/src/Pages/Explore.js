import React from "react";
import ProfileFeed from "../Components/ProfileFeed";
import RightBotExplore from "../Components/RightBotExplore";
import RightBotExploreRevised from "../Components/RightBotExploreRevised";
import NavbarExplore from "../Components/NavbarExplore";
import { Row, Col } from "react-bootstrap";

function Explore() {
  return (
    <div>
      <Row>
        <Col lg={5} className="profile" fixed="top">
          <br />
          <ProfileFeed />
        </Col>

        <Col lg={7} className="feed">
          <NavbarExplore />
          <RightBotExploreRevised />
        </Col>
      </Row>
    </div>
  );
}

export default Explore;
