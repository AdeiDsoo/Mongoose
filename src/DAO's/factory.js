import  usersFile  from "./fileDAO/usersManger.js";
import usersMem from "./memDAO/users.mongo.js";

let usersManager;
const persistencia = process.argv[2];
switch (persistencia) {
  case "MEM":
    usersManager = new usersMem();
    break;
  case "FILE":
    usersManager = new usersFile();
    break;
  default:
    break;
}

export default usersManager;