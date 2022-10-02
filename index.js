const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");

const app = express();

//allows us to use fetch inside the endpoint
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(express.json());

app.listen(3000, () => console.log("API Server is running..."));

app.post("/api/search", (req, res) => {
    const { type, text } = req.body.text;
    let url = 'https://api.github.com/users?q=' + text + 'in:user';

    //fetching list of users from Github API
    fetch(url)
    .then(res => res.json())
    .then(body => {
        let arr = [];
        arr = body.map((user) => {
            const {login, avatar_url} = user;
            console.log({login, avatar_url});}
            //arr = { login: user.login, avatar_url: user.avatar_url };
        )});
        //console.log(arr);
        //(user) => user.login, user.avatar_url
        });
//});