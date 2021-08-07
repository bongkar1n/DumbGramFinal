import { Row, Col, Navbar, Card, Image } from "react-bootstrap";
import "../Style/ProfileFeed.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { API } from "../config/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faCompass } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import blankImage from "../Images/blankProfile.png";

import DumbGram from "../Images/DumbGram.svg";

import React from "react";

function ProfileFeed() {
  const path = "http://localhost:4000/uploads/";
  const [state, dispatch] = useContext(UserContext);
  const [userById, setUserById] = useState([]);
  const [amountFollower, setAmountFollower] = useState([]);
  const [amountFollowing, setAmountFollowing] = useState([]);
  const [amountFeed, setAmountFeed] = useState([]);

  const loadUser = async () => {
    try {
      const response = await API.get(`user`);
      setUserById(response.data.data.user[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAmountFollower = async () => {
    try {
      const response = await API.get(`followers`);
      setAmountFollower(response.data.data.followers);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAmountFollowing = async () => {
    try {
      const response = await API.get(`following`);
      setAmountFollowing(response.data.data.following);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAmountFeed = async () => {
    try {
      const response = await API.get("feed");
      setAmountFeed(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
    loadAmountFollower();
    loadAmountFollowing();
    loadAmountFeed();
  }, []);


  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div>
      <Navbar className="bar">
        <Link to="/feed">
          <div>
            <Image src={DumbGram} className="ms-5 mt-3 main-logo" alt="logo" />
          </div>
        </Link>
      </Navbar>
      <Card className="bg-card text-center mt-3">
        <br /> <br />
        <div className="ms-auto">
          <Link to="/edit">
            <FontAwesomeIcon className="ms-auto icon-edit me-5" icon={faEdit} />
          </Link>
        </div>
        <Card.Body>
          <Card.Text>
            <div className="rounded-circle circle">
              <img src={userById.image === "alternatif" ? blankImage : path + userById.image} className="rounded-circle logo-profile" />
            </div>
          </Card.Text>
          <h3 className="profile-name">{userById.fullname}</h3>
          <p className="username">@{userById.username}</p>
          <br />
          <Row className="mt-4 follow-status">
            <Col lg={4} className="panel">
              <p>Post</p>
              <p className="amount">{amountFeed.length}</p>
            </Col>
            <Col lg={4} className="panel">
              <p>Followers</p>
              <p className="amount">{amountFollower.length}</p>
            </Col>
            <Col lg={4} className="last-panel">
              <p>Following</p>
              <p className="amount">{amountFollowing.length}</p>
            </Col>
          </Row>
          <br />
          <p className="bio" style={{ color: "white", fontSize: "18" }}>
            {userById.bio}
          </p>

          <div class="menu">
            <p>
              <div className="feed-option">
                <FontAwesomeIcon className="ms-auto me-5 icon-feed" icon={faHome} />
                <Link to="/feed" style={{ textDecoration: "none", color: "white" }}>
                  <span className="feed-title">Feed</span>
                </Link>
              </div>
            </p>
            <p>
              <div className="feed-option">
                <FontAwesomeIcon className="ms-auto me-5 icon-explore" icon={faCompass} />
                <Link to="/explore" style={{ textDecoration: "none", color: "white" }}>
                  <span className="explore-title">Explore</span>
                </Link>
              </div>
            </p>
          </div>

          <div class="logout">
            <div onClick={handleLogOut} style={{ textDecoration: "none", color: "white", cursor: "pointer" }}>
              <FontAwesomeIcon className="ms-auto me-5 icon-logout" icon={faSignInAlt} />
              <span className="logout-title">Logout</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfileFeed;
