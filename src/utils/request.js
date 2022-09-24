import axios from "axios";

const service = axios.create({
  url: '/dve',
  Timeout: 5000 ,
})
export default service