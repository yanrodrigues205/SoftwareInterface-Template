import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9090",
    timeout: 10000
});

export const getData = async (endpoint) => {
    try
    {
        const response = await api.get(endpoint);
        return response.data;
    }
    catch(err)
    {
        console.error("Error when making get request: "+err);
        throw err;
    }
};

export const postData = async (endpoint, data) => {
    try
    {
        const response = await api.post(endpoint, data);
        return response.data;
    }
    catch(err)
    {
        console.error("Error when making post request: "+err);
        throw err;
    }
};


export default api;