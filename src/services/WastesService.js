import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getData, postData, deleteData, putData } from "./Request";
const sweetAlert = await withReactContent(Swal);
export default class WastesService
{
    constructor(navigate)
    {
        this.navigate = navigate
    }

    async insert(type, description, classification, unit_of_measure, value)
    {
        if(!type || !description || !classification || !unit_of_measure || !value)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Fill in all the fields to create your account.',
                icon: 'question', // Pode ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            type,
            description,
            classification,
            unit_of_measure,
            value
        }

        let response = await postData("/wastes/insert", data, localStorage.getItem("token"));

        console.log(response);

        if(response.status === 202)
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

    async getall()
    {
        const response = await getData("/wastes/getall", false, localStorage.getItem("token"));
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
                title: 'System Message',
                text: 'To exclude working hours, you must provide your identification (ID).',
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            id_waste: data_id
        }

        let response = await putData("/wastes/disabledByID", data, localStorage.getItem("token"));

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

    async getOneByID(data_id)
    {
        if(!data_id)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'To exclude working hours, you must provide your identification (ID).',
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            waste_id: data_id
        }

        let response = await postData("/wastes/getOneById", data, localStorage.getItem("token"));

        if(!response[0] || (!response[0].type && !response[0].description && !response[0].classification && !response[0].unit_of_measure && !response[0].value))
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Unable to find ID waste => '+data_id,
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }

        return response[0];
    }

    async updateById(data_id, type, description, classification, unit_of_measure, value)
    {
        if(!data_id)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'To change your residue, you must provide your identification(ID).',
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }

        if(!type && !description && !classification && !unit_of_measure && !value)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'To make the change you need to change at least one field!',
                icon: 'question', 
                confirmButtonText: 'OK'
            });
            return;
        }


        let data = {
            waste_id: data_id,
            type,
            description,
            classification,
            unit_of_measure,
            value
        }

        const response = await putData("/wastes/updateById", data, localStorage.getItem("token"));
        if(!response)
        {
            // await sweetAlert.fire({
            //     title: 'System Message',
            //     text: 'We were unable to change these working hours, please try again',
            //     icon: 'error', 
            //     confirmButtonText: 'OK'
            // });
            // return;
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