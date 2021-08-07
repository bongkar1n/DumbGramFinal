import React from "react";
import { useState, useEffect } from "react";
import { Card, Modal, Row, Col, Image } from "react-bootstrap";
import {Link} from 'react-router-dom'
import "../Style/DetailFeed.css";
import abdul from "../Images/abdul.png";
import { API } from "../config/api";

function DetailFeed({ onHide, show, feed, loadComment}) {
  const path = "http://localhost:4000/uploads/";
  const [form, setForm] = useState({
        // feedId: feed.feedId,
        comments: ''
    })

    const { comments } = form

  // const [loadCommentAgain, setLoadCommentAgain] = useState([])

  // const loadComments = async () => {
  //   try {
  //     const load = await API.get(`comments/${feed.feedId}`)
  //     console.log(load);
  //     setLoadComment(load.data.data.comment)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e) => {

      try {
        e.preventDefault();

      const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const body = JSON.stringify({
            ...form,
            feedId: feed.feedId
        })

        const response = await API.post('/comment', body, config)
        console.log(response);

        setForm({
          comments: ""
        })

      } catch (error) {
        console.log(error);
      }
    }

  console.log(loadComment);
  console.log(feed);
  console.log(form);
  


  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" className="main-modal" centered>
        <Modal.Body className="modal-body">
          <Row>
            <Col>
              <Card className="main-card" style={{ width: "30rem" }}>
                <Image src={path + feed.image} fluid />
              </Card>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Image src={path + feed.profileImage} className="rounded-circle detail-profile-image" />
                </Col>
                <Col>
                <Link to={`/user/${feed.id}`} style={{textDecoration: "none"}}>
                  <p className="detail-profile-name">{feed.profileName}</p>
                  </Link>
                </Col>
                
                <Row className="first-row-line">
                  <p className="detail-profile-comment">{feed.caption}</p>
                </Row>
              </Row>
              <Row >
                <Col style={{color: "white", marginTop: "10px", display: "flex"}}>
                  <form onSubmit={handleOnSubmit} >
                <textarea placeholder="comment here.." onChange={handleOnChange} value={comments} name="comments" style={{width: "85%", borderRadius: "10px"}}/>
                <input type="submit" value="Comment" style={{marginLeft: "50%", borderRadius: "10px" }}></input>
                  </form>
                {/* <button type="submit" onSubmit={handleOnSubmit}>Comment</button>  */}
                </Col>
                
                </Row>

{/*               
              <Row>
                <Col>
                  <Image src={abdul} className="detail-profile" />
                </Col>
                <Col>
                  <p className="detail-profile-name">Abdul</p>
                </Col>
                <Row>
                  {" "}
                  <p className="detail-profile-comment">To Begin Again</p>
                </Row>
              </Row> */}
             

              {loadComment.map((everyComment, index) => (
              <Row key={index}>
                <Col>
                  <Image src={path + everyComment.user.image} className="rounded-circle detail-profile-image" />
                </Col>
                <Col>
                  <p className="detail-profile-name">{everyComment.user.username}</p>
                </Col>
                <Row>
                  {" "}
                  <p className="detail-profile-comment">{everyComment.comment}</p>
                </Row>
              </Row>
              ))}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DetailFeed;
