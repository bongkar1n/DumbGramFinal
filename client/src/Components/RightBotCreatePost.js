import React from "react";
import { useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import "../Style/RightBotCreatePost.css";
import { useHistory } from "react-router-dom";
import { API } from "../config/api";

function RightBotCreatePost() {
  let history = useHistory();
  const backToFeed = () => {
    history.push("/feed");
  };
  const [form, setForm] = useState({
    fileName: "",
    caption: "",
  });

  const [preview, setPreview] = useState("");

  const { fileName, caption } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log(form);

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("caption", form.caption);
      formData.set("imageFile", form.image[0], form.image[0].name);

      await API.post("/feed", formData, config);

      backToFeed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-section">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <Col>
          <Container className="py-0">
            {/* <div className="post-button-1">
              <p style={{ paddingTop: "15px" }}>Upload Photos or Video</p>
            </div> */}

            <div className="input-group mb-3">
              <input type="file" onChange={onChange} name="image" className="input-button" />
            </div>
            <div fileName="container-image-preview">{preview && <img src={preview} className=" main-image-preview" />}</div>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control type="text" onChange={onChange} name="caption" className="bg-dark text-light me-5" placeholder="Caption" style={{ widht: 160, marginRight: "15px" }} as="textarea" rows={4} />
            </Form.Group>
          </Container>
        </Col>
        <Col>
          <Button className="mt-4 me-4 post-button-2" type="submit">
            Upload
          </Button>
        </Col>
      </Form>
    </div>
  );
}

export default RightBotCreatePost;
