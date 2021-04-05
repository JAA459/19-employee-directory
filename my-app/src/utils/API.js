import axios from "axios";

 function UserList() {
  return axios.get("https://randomuser.me/api/?results=50&nat=US");
 }

export default { UserList };