import React from "react";
import { Navbar, InputGroup, FormControl, Button, Container } from "react-bootstrap";

import "../Style/RightFeed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function NavbarEditProfile() {
  return (
    <div>
      <Navbar fixed="top" className="notif-bar">
        <Container>
          <InputGroup.Prepend></InputGroup.Prepend>
          <FormControl className="bg-dark text-light ms-4 find-feeds" placeholder="Search" />
          <p className="ms-4 main-title-feed">Edit Profile</p>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* <Notification/> */}
            {/* <NotifModal show={notifShow} handleClose={handleNotifClose} /> */}
            <div>
              <FontAwesomeIcon className="mt-3 icon-notification" icon={faBell} />
            </div>
            <Link to="/message">
              <div>
                <FontAwesomeIcon className="mt-3 icon-notification" icon={faPaperPlane} />
              </div>
            </Link>
            <Navbar.Text className=" mb-5">
              <Link to="/post">
                <Button className="post-button">
                  <span className="plus">
                    <FontAwesomeIcon className="icon-plus" icon={faPlus} />
                  </span>
                  &nbsp;<span className="mt-1 create">Create Post</span>
                </Button>
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarEditProfile;
