const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("API Server is running..."));

app.post("/api/search", (req, res) => {
    s
});