const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const redis = require('redis');

const app = express();
const client = redis.createClient(6379);

//allows us to use fetch inside the endpoint
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(express.json());

app.listen(3000, () => console.log("API Server is running..."));

async function getUsers(req, res, next){
    try{
        console.log('Fecthing data...');
        const { type, text } = req.body.text;
        let url = 'https://api.github.com/users?q=' + text + 'in:user';

        //fetching list of users from Github API
        let response = await fetch(url)
        .then(res => res.json())
        .then(body => {
            let arr = body.map((user) => {
                const {login, avatar_url} = user;
                return({login, avatar_url});
                });
         });
    }
    catch(err){
        console.error(err);
        res.status(500);
    }
}

app.post("/api/search", (req, res) => {
    const { type, text } = req.body.text;
    let url = 'https://api.github.com/users?q=' + text + 'in:user';

    //fetching list of users from Github API
    fetch(url)
    .then(res => res.json())
    .then(body => {
        let arr = body.map((user) => {
            const {login, avatar_url} = user;
            return({login, avatar_url});
            });
        console.log(arr);
            //arr = { login: user.login, avatar_url: user.avatar_url };
        });
        //console.log(arr);
        //(user) => user.login, user.avatar_url
});
//});