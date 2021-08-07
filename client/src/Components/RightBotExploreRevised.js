import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar, Col, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../Style/RightBotFeed.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import { API } from "../config/api";

function RightBotExploreRevised() {
  const path = "http://localhost:4000/uploads/";
  const [modalShow, setModalShow] = React.useState(false);
  const [feed, setFeed] = useState([]);
  const [forDetailFeed, setForDetailFeed] = useState({
    id: "",
    image: "",
    profileImage: "",
    profileName: "",
    caption: "",
  });

  const loadAllFeed = async () => {
    try {
      const response = await API.get("all-feeds");
      setFeed(response.data.data.feed);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    loadAllFeed();
   
  }, []);


  return (
    <div className="masonry-holder">
      {feed.map((everyfeed, index) => (
        <Col key={index} md={4}>
          <Card style={{ width: "23rem" }} className="card-feed">
            <Card.Img
              variant="top"
              className="img-feed"
              src={path + everyfeed.fileName}
              onClick={() => {
                setModalShow(true);
                setForDetailFeed({
                  id: everyfeed.user.id,
                  image: everyfeed.fileName,
                  profileImage: everyfeed.user.image,
                  profileName: everyfeed.user.username,
                  caption: everyfeed.caption,
                });
              }}
            />

            <Card.Body style={{ padding: "0" }}>
              <Row>
                <Col>
                  <Row style={{ margin: "0" }}>
                    <Col className="container-profile-image">
                      <img src={path + everyfeed.user.image} className="card-profiles-user" alt="logo" />
                    </Col>
                    <Col>
                    <Link to={`user/${everyfeed.user.id}`} style={{textDecoration: "none"}}>
                      <p className="username-profile" style={{textDecoration: "none", color: "white"}}>{everyfeed.user.username} </p>
                      </Link>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Navbar.Text className="ms-auto d-flex justify-content-end" style={{ marginTop: "5px" }}>
                      <FontAwesomeIcon className="icon-icon" icon={faHeart} />
                      <FontAwesomeIcon className="icon-icon" icon={faComment} />
                      <FontAwesomeIcon className="icon-icon" icon={faPaperPlane} />
                    </Navbar.Text>
                  </Row>
                  <Row>
                    <p className="amount-like">126.100 Like</p>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}

    </div>
  );
}

export default RightBotExploreRevised;
