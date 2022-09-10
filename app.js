import fetch from 'node-fetch';

const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
app.use(express.json());
app.listen(3000, () => console.log("API Server is running..."));

app.post("/api/search", (req, res) => {
    const { type, text } = req.body;
    let url = 'https://api.github.com/users/' + text;
    fetch(url).then(res=>res.json()).then(data=>{
        if(data.message){
            console.log('User profile not found')
        }
        else{
            let username = data.name;
            let pfp = data.avatar_url;
        }
        res.send({
            username,
            pfp
        });
    });
});