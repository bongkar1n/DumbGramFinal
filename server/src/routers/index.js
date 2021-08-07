const express = require("express");

const router = express.Router();

module.exports = router;

const { users, addUser, userData, updateUser, deleteUser, getUserById } = require("../controllers/user.js");
const { registration, login, checkAuth } = require("../controllers/auth.js");
const { following, getFollower, addFollowing, isFollowing, deleteFollowing } = require("../controllers/follows");
const { addFeed, getFeedById, getFeedByFollow, getFeedByIdUser, getAllFeeds, addLike, getAllComments, addComment, isLiked, getCommentByFeedId } = require("../controllers/feed");
const { addMessage, getMessageWithOthers } = require("../controllers/message");

// Middleware
const { auth } = require("../middleware/auth.js");
const { uploadFile } = require("../middleware/uploadFile");

// auth

router.post("/register", registration);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

// user

router.get("/users", users);
router.get("/user/:id", auth, getUserById);
router.post("/user", addUser);
router.get("/user", auth, userData);
router.put("/user", auth, uploadFile("imageFile"), updateUser);
router.delete("/user/:id", deleteUser);

//get follower & following

router.get("/followers", auth, getFollower);
router.post("/follow/:id", auth, addFollowing);
router.get("/following", auth, following);
router.get("/follow/:id", auth, isFollowing);
router.delete("/follow/:id", auth, deleteFollowing);

// feed

router.post("/feed", auth, uploadFile("imageFile"), addFeed);
router.get("/feed", auth, getFeedById);
router.get("/feed-follow", auth, getFeedByFollow);
router.get("/all-feeds", getAllFeeds);
router.get("/feed/:id", getFeedByIdUser);
router.get("/like/:id", auth, isLiked);

// like & comment

router.post("/like", auth, addLike);
router.get("/all-comments", auth, getAllComments);
router.post("/comment", auth, addComment);
router.get("/comments/:id", auth, getCommentByFeedId);

// send message

router.post("/message/:id", auth, addMessage);
router.get("/messages/:id", auth, getMessageWithOthers);
