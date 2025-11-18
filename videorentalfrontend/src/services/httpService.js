import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

/**
 * Axios response interceptor:
 * - This runs automatically for every response.
 * - It helps us handle errors globally instead of repeating try/catch everywhere.
 */
axios.interceptors.response.use(
  null, // No change to successful responses
  error => {
    // Check if the error is an expected client error (status 400–499)
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    // If it's not an expected error (like 500, network error, etc.)
    // we log it and show a toast notification
    if (!expectedError) {
      logger.error("Unexpected error:", error);
      toast.error("An unexpected error occurred.");
    }

    // Always reject the promise so the calling code can still handle the error
    return Promise.reject(error);
  }
);

/**
 * Sets the default JWT header for Axios.
 * This ensures every request automatically includes the token
 * so the backend can authenticate the user.
 */
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

/**
 * Export commonly used HTTP methods and setJwt().
 * This makes it easy to use across your app like:
 *   import http from './httpService';
 *   http.post('/api/users', data);
 */
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
