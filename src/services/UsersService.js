import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { postData } from "./Request";
const sweetAlert = await withReactContent(Swal);

export default class UserService
{
    constructor(navigate)
    {
        this.navigate = navigate;
    }

    async insert(name, email, password, confirm_password, recaptcha)
    {

        if(!email || !name || !password || !confirm_password)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Fill in all the fields to create your account.',
                icon: 'question', // Pode ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'OK'
            });
            return;
        }

        if(!recaptcha)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Complete the REcaptcha to continue your account registration.',
                icon: 'question', // Pode ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'OK'
            });
            return;
        }


        if(password !== confirm_password)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Password do not match, write the same password in both fields.',
                icon: 'error', // Pode ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'OK'
            });
            return;
        }

        if(password.length <= 8)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'The password must have at least 8 characters.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            name,
            email,
            password,
            recaptcha
        }

        let response = await postData("/signup", data);
        console.log(response);

        if(response && response.status === 202)
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

    async getOneByID(user_id)
    {
        if(!user_id || user_id.length <= 10)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: 'Para concluir a busca de informação é necessário informar o ID.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            id: user_id
        }


        let response = await postData("/user/getUserById", data, localStorage.getItem("token"));

        console.log("INFORMAÇÕES OBTIDAS DO USUÁRIO",response);
        return response;
    }
}
