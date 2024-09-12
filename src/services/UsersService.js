import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { postData } from "./Request";
const sweetAlert = await withReactContent(Swal);

export default class UserService
{

    async __construct()
    {

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
            password
        }

        let response = await postData("/first-factor", data);
        console.log(response);


    }
}
