import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getData, postData, deleteData, putData } from "./Request";
const sweetAlert = await withReactContent(Swal);

export default class WorkHoursService
{
    #navigate;
    constructor(navigate)
    {
        this.#navigate = navigate;
    }


    async insert(amd_first, amd_second, bmd_first, bmd_second, week_days, comments)
    {
        if(!bmd_first || !bmd_second || !amd_first || !amd_second || !comments || !week_days)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Fill in all the fields to create your work hour.',
                icon: 'question', 
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            BMD_first: bmd_first,
            BMD_second: bmd_second,
            AMD_first: amd_first,
            AMD_second: amd_second,
            week_days,
            comments
        }

        const response = await postData("/work_hours/insert", data, localStorage.getItem("token"));

        if(!response)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Unable to enter working hours.',
                icon: 'question', 
                confirmButtonText: 'OK'
            });
            return;
        }

        if(response.status === 202)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Unable to enter working hours.',
                icon: 'success', 
                confirmButtonText: 'OK'
            });
            return;
        }
    }

    async getAll()
    {
        const response = await getData("/work_hours/getall", false, localStorage.getItem("token"));
        
        if(response.length > 0)
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
            id: data_id
        }

        let response = await deleteData("/work_hours/deleteByID", data, localStorage.getItem("token"));

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

    async getOneById(data_id)
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
            id: data_id
        }

        let response = await postData("/work_hours/getOneById", data, localStorage.getItem("token"));

        if(!response || (!response.AMD_first && !response.AMD_second && !response.BMD_first && !response.BMD_second && !response.week_days && !response.comments))
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Unable to find ID working hours => '+data_id,
                icon: 'error', 
                confirmButtonText: 'OK'
            });
            return;
        }

        return response;
    }

    async updateOneById(data_id, amd_first, amd_second, bmd_first, bmd_second, week_days, comments)
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


        if(!amd_first && !amd_second && !bmd_first && !bmd_second && !week_days && !comments)
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
            id: data_id,
            AMD_first: amd_first,
            AMD_second: amd_second,
            BMD_first: bmd_first,
            BMD_second: bmd_second,
            comments,
            week_days
        }

        const response = await putData("/work_hours/updateById", data, localStorage.getItem("token"));
        if(!response)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'We were unable to change these working hours, please try again',
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