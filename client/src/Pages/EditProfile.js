import { Row, Col, Navbar, Card, Image } from "react-bootstrap";

import "../Style/EditProfile.css";
import NavbarEditProfile from "../Components/NavbarEditProfile";
import RightBotEditProfile from "../Components/RightBotEditProfile";
import ProfileFeed from "../Components/ProfileFeed";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

import DumbGram from "../Images/DumbGram.svg";
import Profile from "../Images/Rectangle 5.png";

function EditProfile() {
  return (
    <div>
      <Row>
        <Col lg={5} className="profile" fixed="top">
          <ProfileFeed />
        </Col>

        <Col lg={7} className="feed">
          <NavbarEditProfile />
          <RightBotEditProfile />
        </Col>
      </Row>
    </div>
  );
}

export default EditProfile;
