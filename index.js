const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");

const app = express();

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(express.json());

app.listen(3000, () => console.log("API Server is running..."));

app.post("/api/search", (req, res) => {
    const { type, text } = req.body.text;
    let url = 'https://api.github.com/users?q=' + text + 'in:user';
    fetch(url).then(res => res.json()).then(data => console.log(data));
});