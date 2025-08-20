// import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL : "https://localhost:5000/api",
//     withCredentials:true,
    
// })
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);
