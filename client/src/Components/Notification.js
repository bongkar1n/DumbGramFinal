import React from "react";
import "../Style/Notification.css";
import MiniProfile from "../Images/Rectangle 5.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Card } from "react-bootstrap";

import { Popover } from "antd";
import "antd/dist/antd.css";

function Notification() {
  const content = (
    <div className="container-notif">
      <Card style={{ width: "15rem" }} className="card-notif">
        <div className="start-notif">
          <div className="oval-notif">
            <Card.Img className="rounded-circle profil-notif" variant="top" src={MiniProfile} />
          </div>
          <Card.Body>
            <Card.Text className="name-notif">abdul_ha</Card.Text>
            <Card.Text>
              Komentar : <span className="comment-notif">Nice Place</span>
            </Card.Text>
          </Card.Body>
        </div>
      </Card>

      <Card style={{ width: "15rem" }} className="card-notif">
        <div className="start-notif">
          <div className="oval-notif">
            <Card.Img className="rounded-circle profil-notif" variant="top" src={MiniProfile} />
          </div>
          <Card.Body>
            <Card.Text className="name-notif">egi-lol</Card.Text>
            <Card.Text>
              Komentar : <span className="comment-notif">Good Vibe</span>
            </Card.Text>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
  return (
    <div>
      <Popover placement="bottomRight" content={content} trigger="click">
        <FontAwesomeIcon className="icon-notification ms-1" icon={faBell} />
      </Popover>
    </div>
  );
}

export default Notification;
