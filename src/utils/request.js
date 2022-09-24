import axios from "axios";

const service = axios.create({
  url: process.env.VUE_APP_BASE_API,
  Timeout: 5000 ,
})
export default service