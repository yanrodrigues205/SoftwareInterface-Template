import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getData, postData, deleteData, putData } from "./Request";
const sweetAlert = await withReactContent(Swal);

export default class CollectPointService
{
    #navigate;
    constructor(navigate)
    {
        this.#navigate = navigate;
    }

    async insert(name, description, latitude, longitude, street, city, state, country, address_number, id_work_hours)
    {
        if(!name || !description || !latitude || !longitude || !street || !city || !state || !country || !address_number || !id_work_hours)
        {
            await sweetAlert.fire({
                title: 'Mensagem do Sistema',
                text: 'Preencha todos os campos para concluir a inserção do ponto de coleta.',
                icon: 'question', 
                confirmButtonText: 'OK'
            });
            return;
        }
        latitude = latitude.toString();
        longitude = longitude.toString();

        let data = {
            name,
            description,
            latitude,
            longitude,
            id_work_hours,
            address_number,
            street,
            city,
            state,
            country
        }

        const response = await postData("/collect_points/insert", data, localStorage.getItem("token"));

        if(response.status === 202)
        {
            await sweetAlert.fire({
                title: 'Mensagem do Sistema',
                text: 'Ponto de Coleta adicionado com sucesso!',
                icon: 'success', 
                confirmButtonText: 'OK'
            });
            return;
        }
    }

    async getAll()
    {
        const response = await getData("/collect_points/getAllById", false, localStorage.getItem("token"));
        
        if(response && response.length > 0)
        {
            return response;
        }
    }

    async getAllPublic()
    {
        const response = await getData("/collect_points/getall", false, false);
        
        if(response && response.length > 0)
        {
            return response;
        }
    }

    async deleteById(data_id)
    {
        if(!data_id)
        {
            await sweetAlert.fire({
                title: 'Mensagem do Sistema',
                text: 'Sem identificação do ponto de coleta não é possível apagar.',
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            id: data_id
        }

        let response = await deleteData("/collect_points/deleteByID", data, localStorage.getItem("token"));

        if(response)
        {
            await sweetAlert.fire({
                title: 'Mensagem do Sistema',
                text: `${response.message}`,
                icon: 'success', 
                confirmButtonText: 'OK'
            });
            return;
        }
    }

    async getOneById(data_id)
    {
        if(!data_id)
        {
            await sweetAlert.fire({
                title: 'Mensagem do Sistema',
                text: 'Sem identificação do ponto de coleta não é possível apagar.',
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            id_collect_point: data_id
        }

        let response = await postData("/collect_points/getOneById", data, localStorage.getItem("token"));
        console.log("get one model ", response)
        if(!response || (!response.name && !response.description && !response.street && !response.state && !response.country))
        {
            await sweetAlert.fire({
                title: 'Mensagem do Sistema',
                text: 'Não foi possível pegar informações do ponto de coleta de ID=> '+data_id,
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }
        return response;
    }

    async updateOneById(data_id, name, description, latitude, longitude, street, city, state, country, address_number, id_work_hours)
    {
        if(!data_id)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Para a atualização é necessário informar a identificação do ponto de coleta (ID).',
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }


        if(!name && !description && !street && !city && !state && !country && !address_number && !id_work_hours && !latitude && !longitude)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Para alterar um ponto de coleta é necessário modificar ao menos um campo!',
                icon: 'question', 
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            id: data_id,
            name: name,
            description: description,
            street: street,
            city: city,
            state,
            country,
            id_work_hours,
            latitude,
            longitude,
            address_number,
        }

        const response = await putData("/collect_points/updateById", data, localStorage.getItem("token"));
        console.log(response)
        if(!response)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'It was not possible to change this residue. Try again',
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }

        if(response)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: `${response.message}`,
                icon: 'success', 
                confirmButtonText: 'OK'
            });
            return;
        }
    }
}