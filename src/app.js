import express from "express";
import { __dirname } from "./utils";

const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8080, ()=>{
    console.log('server is running on port 8080');
})