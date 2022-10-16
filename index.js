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
                return([login, avatar_url]);
                });
            return(arr);
            });

        console.log(response);
         //set data to REDIS
        //client.setEx(response.login, 7200, response);
        //client.rPush(response, (err, reply) => {
          // console.log('error');
        //});
        //res.send(response => {
        //    for (i = 0; i < response.length; i++)
        //        document.getElementById("list").innerHTML += (i+1) + ": " + response[i];
        //});
    }
    catch(err){
        console.error(err);
        res.status(500);
    }
}

app.post("/api/search",  getUsers);
//});