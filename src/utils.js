import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";

const JWT_SECRET="jwSECRET"

export const __dirname = dirname(fileURLToPath(import.meta.url));

//para hashear una cierta informacion
//data, rounds
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