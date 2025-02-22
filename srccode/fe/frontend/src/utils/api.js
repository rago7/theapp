import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with your JSON server base URL
  timeout: 5000, // Set request timeout
});

// Generic GET request
export const get = async (url, params = {}) => {
  try {
    let token = localStorage.getItem("token")
    const response = await apiClient.get(url, { 
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
      params });
    return response.data;
  } catch (error) {
    console.error(`GET request to ${url} failed:`, error);
    throw error;
  }
};

// Generic POST request
export const post = async (url, data) => {
  try {
    const token = localStorage.getItem("token");
    console.log("vsvs", token)
    const response = await apiClient.post(url, data, {
      headers: {
        // Authorization: `Bearer ${token}`, // Add the Bearer token
      },
    });
    return response.data;
  } catch (error) {
    console.error(`POST request to ${url} failed:`, error);
    throw error;
  }
};

// Generic PUT request
export const put = async (url, data) => {
  try {
    let token = localStorage.getItem("token")
    const response = await apiClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
    });
    return response.data;
  } catch (error) {
    console.error(`PUT request to ${url} failed:`, error);
    throw error;
  }
};

// Generic DELETE request
export const remove = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error(`DELETE request to ${url} failed:`, error);
    throw error;
  }
};
