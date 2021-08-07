import { useContext, useEffect } from "react";
import LandingPage from "./Pages/LandingPage";
import "./bootstrap.min.css";
import FeedPageRevised from "./Pages/FeedPageRevised";
import FeedPageFollow from "./Pages/FeedPageFollow";
import CreatePostRevised from "./Pages/CreatePostRevised";
import EditProfile from "./Pages/EditProfile";
import { Route, Switch, useHistory } from "react-router-dom";
import Explore from "./Pages/Explore";
import Message from "./Pages/Message";
import { UserContext } from "./Context/UserContext";
import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const router = useHistory();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (state.isLogin === false) {
      router.push("/auth");
    } else {
      router.push("/feed");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Switch>
      <>
        <Route exact path="/auth" component={LandingPage} />
        <div>
          <Route path="/feed" component={FeedPageRevised} />
          <Route path="/user/:id" component={FeedPageFollow} />
          <Route path="/explore" component={Explore} />
          <Route path="/post" component={CreatePostRevised} />
          <Route path="/edit" component={EditProfile} />
          <Route path="/message" component={Message} />
        </div>
      </>
    </Switch>
  );
}

export default App;
