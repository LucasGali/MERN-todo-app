import axios from 'axios';

const apiUrl = process.env.REACT_APP_API

// get user token from useAuth hook and set it as default header
// so we don't have to set it manually in every request and updates automatically after login
export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['auth-token'];
  }
}

export function getTasks() {
  return axios.get(`${apiUrl}/tasks`)
}

export function getTaskByUser(id) {
  return axios.get(`${apiUrl}/tasks/${id}`)
}

export function addTask(task) {
  return axios.post(`${apiUrl}/tasks`, task)
}

export function updateTask(id, task) {
  return axios.put(`${apiUrl}/tasks/${id}`, task)
}

export function deleteTask(id) {
  return axios.delete(`${apiUrl}/tasks/${id}`)
}
