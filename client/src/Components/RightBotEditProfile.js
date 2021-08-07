import { Form, Button, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../Style/RightBotEditProfile.css";
import { Link, useHistory } from "react-router-dom";
import { API } from "../config/api";

function RightBotEditProfile() {
  let history = useHistory();
  const backToFeed = () => {
    history.push("/feed");
  };
  const [state, setstate] = useState([]);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    bio: "",
    image: "",

    // fullname: state.fullname,
    // username: state.username,
    // bio: state.bio,
    // image: state.image,
  });
  const [preview, setPreview] = useState("");

  let { fullname, username, bio } = form;

  const handleOnChange = (e) => {
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

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // const body = JSON.stringify({ ...form });

      const formData = new FormData();
      formData.set("fullname", form.fullname ? form.fullname : state.fullname);
      formData.set("username", form.username ? form.username : state.username);
      formData.set("bio", form.bio ? form.bio : state.bio);
      if (form.image) {
        formData.set("imageFile", form.image[0], form.image[0].name);
      }

      const response = await API.put("/user", formData, config);
      console.log(response);
      backToFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async () => {
    try {
      const response = await API.get("/user");
      setstate(response.data.data.user[0]);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  console.log(form);

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Col>
          <Container className="py-0">
            {/* <Button className="mb-5 post-button-edit-profile me-5">Upload Photos</Button> */}
            <div className="input-group mb-3">
              <input type="file" onChange={handleOnChange} name="image" className="input-button-edit-profile" />
            </div>
            <div fileName="container-image-preview">{preview && <img src={preview} className=" main-image-preview" />}</div>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control className="bg-dark text-light" type="text" name="fullname" onChange={handleOnChange} placeholder={state.fullname} bordered />
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control className="bg-dark text-light" type="text" name="username" onChange={handleOnChange} placeholder={state.username} bordered />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control className="bg-dark text-light me-5" name="bio" onChange={handleOnChange} placeholder={state.bio ? state.bio : "Bio"} style={{ widht: 160, marginRight: "15px" }} as="textarea" rows={3} />
            </Form.Group>
          </Container>
        </Col>
        <Col>
          <Button type="submit" className="mt-4 me-4 post-button-2">
            Save
          </Button>
        </Col>
      </Form>
    </div>
  );
}

export default RightBotEditProfile;
