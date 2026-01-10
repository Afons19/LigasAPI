import axios from "axios";

const api = axios.create({
    baseURL: 'https://ligasapi.onrender.com/api/'
});

export default api;