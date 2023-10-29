import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"

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