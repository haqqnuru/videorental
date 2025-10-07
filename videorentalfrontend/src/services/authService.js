
import { jwtDecode } from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

// Full API endpoint for authentication requests
const apiEndpoint = apiUrl + "/auth";

// The key used to store the JWT token in localStorage
const tokenKey = "token";

// Whenever this module loads, attach the stored JWT (if any) to HTTP headers
// This ensures authenticated requests automatically include the token
http.setJwt(getJwt());

/**
 * Logs in the user with their email and password.
 * Sends a POST request to the backend auth route.
 * If successful, saves the returned JWT in localStorage.
 */
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

/**
 * Logs in the user using an already issued JWT.
 * (Useful when registering a new user and logging them in immediately.)
 */
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

/**
 * Logs the user out by removing the JWT from localStorage.
 * This effectively ends the session.
 */
export function logout() {
  localStorage.removeItem(tokenKey);
}

/**
 * Returns the currently logged-in user.
 * It decodes the JWT token and returns the payload (user info).
 * If there’s no token or it’s invalid, returns null.
 */
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt); // decode token payload (e.g., name, email)
  } catch (ex) {
    return null; // token missing or invalid
  }
}

/**
 * Helper function to get the JWT token directly from localStorage.
 * Useful for sending in HTTP headers (like Authorization).
 */
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

// Export all functions as a default object for convenience
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
