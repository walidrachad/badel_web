import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://staging.bedelportal.com",
  timeout: 10_000,
});

// Optional: interceptors for auth / logging
http.interceptors.response.use(
  (r) => r,
  (err) => {
    // You can normalize errors here
    return Promise.reject(err);
  }
);
