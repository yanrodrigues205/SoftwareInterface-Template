import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const sweetAlert = await withReactContent(Swal);

const api = axios.create({
    baseURL: "http://localhost:9090",
    timeout: 10000
});

export const getData = async (endpoint, data = false, token = false) => {
    try
    {
        let response;
       
        const config = {};

        // Adiciona o token de autorização, se presente
        if (token) {
            config.headers = {
                "Authorization": `Bearer ${token}`
            };
        }

        // Adiciona os parâmetros de query, se presentes
        if (data) {
            config.params = data;
        }

        response = await api.get(endpoint, config);

        return response.data;
    }
    catch(err)
    {
        await sweetAlert.fire({
            title: 'System Message',
            text: `${err.response.data.message}`,
            icon: 'error', // Pode ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'OK'
        });
        return;
    }
};

export const putData = async (endpoint, data, token = false) => {
    try
    {
        let response;
        if(token)
        {
            response = await api.put(endpoint, data, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
        }
        else
        {
            response = await api.post(endpoint, data);
        }

        return response.data;
    }
    catch(err)
    {
        await sweetAlert.fire({
            title: 'System Message',
            text: `${err.response.data.message}`,
            icon: 'error', // Pode ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'OK'
        });
        return;
    }
};

export const postData = async (endpoint, data, token = false) => {
    try
    {
        let response = "";
        if(token)
        {
            response = await api.post(endpoint, data, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
        }
        else
        {
            response = await api.post(endpoint, data);
        }
        


        return response.data;
    }
    catch(err)
    {
        await sweetAlert.fire({
            title: 'System Message',
            text: `${err.response.data.message}`,
            icon: 'error', // Pode ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'OK'
        });
        return false;
    }
};

export const deleteData = async (endpoint, data, token = false) => {
    try
    {
        let response;
        if(token)
        {
            response = await api.delete(endpoint, {
                headers:{
                    "Authorization": `Bearer ${token}`
                },
                data: data
            });
        }
        else
        {
            response = await api.delete(endpoint, {
                data: data
            });
        }
        


        return response.data;
    }
    catch(err)
    {
        await sweetAlert.fire({
            title: 'System Message',
            text: `${err.response.data.message}`,
            icon: 'error', // Pode ser 'success', 'error', 'warning', 'info', 'question'
            confirmButtonText: 'OK'
        });
        return;
    }
};


export default api;