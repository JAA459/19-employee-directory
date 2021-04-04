import axios from "axios";

 const UserList = () => {
  return axios.get("https://randomuser.me/api/?results=200&nat=US");
 }

module.exports = UserList;