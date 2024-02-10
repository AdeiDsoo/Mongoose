import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";
import config from "../config/config.js"

const JWT_SECRET=config.jwt_secret


const currentFilePath = fileURLToPath(import.meta.url);


const currentDir = dirname(currentFilePath);

const parentDir = dirname(currentDir);

export const __dirname = parentDir;
// export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashData= async(data)=>{
    const hash= await bcrypt.hash(data, 10)
    return hash
}


export const compareData=async(data, hashData)=>{
    return bcrypt.compare(data, hashData)
}

export const generateToken= (user)=>{
    const token=jwt.sign(user, JWT_SECRET, {expresIn:300})
    return token
}