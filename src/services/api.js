import axios from "axios";

export default axios.create({
  // Base api url
  baseURL: 'https://anwalu-backend.herokuapp.com'
});
