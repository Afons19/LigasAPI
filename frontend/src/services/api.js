import axios from "axios";

const api = axios.create({
    baseURL: 'https://ligas-api.onrender.com/api'
});

export default api;
