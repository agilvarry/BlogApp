import axios from "axios";
const baseUrl = "/api/users";

const create = async (credentials) =>{
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  
  }

const getUsers = async(credentials) => {
  const response = await axios.get(baseUrl, credentials);
  return response.data
}
  
  const out = { create, getUsers };
  export default out;