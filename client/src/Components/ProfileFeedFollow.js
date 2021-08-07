import { Row, Col, Navbar, Card, Image, Button } from "react-bootstrap";
import "../Style/ProfileFeedFollow.css";
import { useState, useEffect, useContext } from "react";
import { API } from "../config/api";
import { useParams } from "react-router";
import { UserContext } from "../Context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import {  faCompass } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";


import DumbGram from "../Images/DumbGram.svg";

import React from "react";

function ProfileFeedFollow() {
  const path = "http://localhost:4000/uploads/";
  const [state, dispatch] = useContext(UserContext)
  const {id} = useParams()
  const [userById, setUserById] = useState([]);
  const [amountFollower, setAmountFollower] = useState([]);
  const [amountFollowing, setAmountFollowing] = useState([]);
  const [amountFeed, setAmountFeed] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false)

  const loadUserById = async () => {
    try {
      const response = await API.get(`user/${id}`);
      setUserById(response.data.data.user);
      setAmountFollower(response.data.data.user.follower)
      setAmountFollowing(response.data.data.user.following)

    } catch (error) {
      console.log(error);
    }
  };


  const isFollow = async () => {
    try {
      const response = await API.get(`follow/${id}`)
      setIsFollowing(response.data.data)
    } catch (error) {
      console.log(error);
      
    }
  }


  const loadAmountFeed = async () => {
    try {
      const response = await API.get(`feed/${id}`);
      setAmountFeed(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const handleFollow = async () => {
    try {

        if(isFollowing === false){
            setIsFollowing(true)
        } 

        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }

        const response = await API.post(`follow/${id}`, config)
    } catch (error) {
        console.log(error)
    }
}

const handleUnfollow = async () => {
  try {

      if(isFollowing === true){
          setIsFollowing(false)
      } 

      const config = {
          headers: {
              "Content-type":"application/json"
          }
      }

      const response = await API.delete(`follow/${id}`, config)
  } catch (error) {
      console.log(error)
  }
}


useEffect(() => {
  loadUserById();
  loadAmountFeed();
  isFollow();
 
}, [isFollowing]);


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
       
        <Card.Body>
          <Card.Text>
            <div className="rounded-circle circle">
              <img src={path + userById.image} className="rounded-circle logo-profile" alt="logo" />
            </div>
          </Card.Text>
          <h3 className="profile-name">{userById.fullname}</h3>
          <p className="username">{userById.username}</p>
          <Row>
            <Col>
              <Button className="follow-button me-3">
                &nbsp;<span className="create">Message</span>
              </Button>
              {isFollowing ?
              <Button className="unfollow-button ms-3" onClick={handleUnfollow}>
              &nbsp;<span>Unfollow</span>
            </Button> 
              :
              <Button className="follow-button me-3" onClick={handleFollow}>
              &nbsp;<span className="create">Follow</span>
            </Button>
            }
            </Col>
          </Row>

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

          <div class="logout" onClick={handleLogOut}>
            <div style={{ textDecoration: "none", color: "white", cursor: "pointer" }}>
              <FontAwesomeIcon className="ms-auto me-5 icon-logout" icon={faSignInAlt} />
              <span className="logout-title">Logout</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfileFeedFollow;
