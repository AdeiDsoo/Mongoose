export default class UserDTO {
    constructor(obj) {
      this.full_name = `${obj.first_name} ${obj.last_name}`;
      this.email = obj.email;
      this.password = obj.password;
      this.first_name = obj.first_name;
      this.last_name = obj.last_name
      this.role = obj.role
    }
  }