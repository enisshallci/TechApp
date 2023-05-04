import { json } from "express";
import express from 'express';
import cors from "cors";
import axios from "axios";

const app = express();
app.use(json());
app.use(cors({ origin: true }));




app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try{
    const r = await axios.put(
        'http://api.chatengine.io/users/',
        {username: username, secret: username,first_name: username},
        {headers: {"private-key":"0ec98a8d-7463-461c-8fea-567d18c9d306"}}
    )
    return res.status(r.status).json(r.data)
    }catch(e){
        return res.status(r.response.status).json(e.response.data)
    }
    
});

app.listen(3000);