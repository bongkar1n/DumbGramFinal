require("dotenv").config();
const express = require("express");
const router = require("./src/routers");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const port = 4000;

app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`you are running at port ${port}`));
