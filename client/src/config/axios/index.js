import axios from "axios";
import { refreshAuthToken } from "../../features/auth/authThunks";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

// Create a variable to store the token getter function
let getToken = () => null;
let dispatch = null;

// Function to set the token getter and dispatch function
export const setAuthConfig = (tokenGetter, dispatchFn) => {
  getToken = tokenGetter;
  dispatch = dispatchFn;
};

Axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Dispatch refresh token action using the stored dispatch function
        if (dispatch) {
          await dispatch(refreshAuthToken()).unwrap();

          // Get the new token using the token getter
          const newToken = getToken();

          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Retry the original request with new token
          return Axios(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default Axios;
