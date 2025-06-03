import axios from "axios"


const API_URL = "http://localhost:3000"

export const registerRequest = async user => axios.post(`${API_URL}/api/register`, user)





