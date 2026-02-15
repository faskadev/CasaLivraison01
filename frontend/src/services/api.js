import axios from "axios";
import { API_URL } from "../config/constants.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.log("API_URL value:", API_URL);

const baseURL = API_URL || "http://192.168.1.104:3000/api";

console.log("Creating axios instance with baseURL:", baseURL);

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

// Add token interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Error getting token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

console.log("Axios instance created successfully:", api !== undefined);
console.log("Axios instance baseURL:", api?.defaults?.baseURL);

export default api;
