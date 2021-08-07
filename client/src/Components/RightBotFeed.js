import React, { useEffect } from "react";
import { Navbar, Col, Card, Row } from "react-bootstrap";
import { useState } from "react";

import "../Style/RightBotFeed.css";
import DetailFeed from "./DetailFeed";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import { API } from "../config/api";

function RightBotFeed() {
  const path = "http://localhost:4000/uploads/";
  const [modalShow, setModalShow] = React.useState(false);
  const [feed, setFeed] = useState([]);
  const [feedByFollow, setFeedByFollow] = useState([]);
  const [loadComment, setLoadComment] = useState([])
  // const [isLiked, setIsLiked] = useState()
  const [forDetailFeed, setForDetailFeed] = useState({
    id: "",
    image: "",
    profileImage: "",
    profileName: "",
    caption: "",
    feedId: "",
  });


  const loadFeed = async () => {
    try {
      const response = await API.get("feed");
      setFeed(response.data.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    try {

      const body = JSON.stringify({ feedId: id });

      const config = {
        headers: {
            "Content-type":"application/json"
        }
    }
      
      const add = await API.post(`like`, body, config)
      loadFeed();
      loadFeedByFollow();

      // const response = await API.get(`like/${id}`);
      // setIsLiked(response.data.data)


    } catch (error) {
      console.log(error);
    }
  }

  const loadFeedByFollow = async () => {
    try {
      const response = await API.get("feed-follow");
      setFeedByFollow(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isLike = async (id) => {
    try {
      const body = id
      const response = await API.get("like", body);
      // setIsLiked()
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  
  const loadComments = async (commentId) => {
    try {
      const load = await API.get(`comments/${commentId}`)
      console.log(load);
      setLoadComment(load.data.data.comment)
    } catch (error) {
      console.log(error);
    }
  }


  const showAllFeeds = [...feed, ...feedByFollow];


  useEffect(() => {
    loadFeed();
    loadFeedByFollow();
  }, []);

  // console.log(showAllFeeds);
  

  return (
    <div className="masonry-holder">
      {showAllFeeds.map((everyfeed, index) => (
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
                  feedId: everyfeed.id
                });
                loadComments(everyfeed.id);
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
                      <p className="username-profile">{everyfeed.user.username}</p>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Navbar.Text className="ms-auto d-flex justify-content-end" style={{ marginTop: "5px" }}>
                      {/* {isLiked? <FontAwesomeIcon className="icon-icon" icon={faHeart} onClick={() => handleLike(everyfeed.id)} /> 
                      :
                      <FontAwesomeIcon className="icon-icon" icon={faHeart} onClick={() => handleLike(everyfeed.id)} style={{color: "red"}} />
                       } */}
                      <FontAwesomeIcon className="icon-icon" icon={faHeart} onClick={() => handleLike(everyfeed.id)} />
                      <FontAwesomeIcon className="icon-icon" icon={faComment} />
                      <FontAwesomeIcon className="icon-icon" icon={faPaperPlane} />
                    </Navbar.Text>
                  </Row>
                  <Row>
                    <p className="amount-like">{everyfeed.feedLike} Like</p>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}

      <DetailFeed show={modalShow} onHide={() => setModalShow(false)} feed={forDetailFeed} loadComment={loadComment} />
    </div>
  );
}

export default RightBotFeed;
