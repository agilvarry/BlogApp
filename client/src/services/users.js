import axios from "axios";
const baseUrl = "/api/users";

const create = async (credentials) =>{
    const response = await axios.post(baseUrl, credentials);
    console.log(response);
    return response.data;
  
  }
  
  const out = { create };
  export default out;