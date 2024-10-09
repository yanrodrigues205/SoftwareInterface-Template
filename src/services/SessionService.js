import { postData } from "./Request";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const sweetAlert = withReactContent(Swal);

export default class SessionService
{
    constructor(navigate)
    {
        this.navigate = navigate;
    }

    async firstFactor(email, password, recaptcha)
    {
        if(!email || !password)
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

        let data = {
            email,
            password,
            recaptcha
        }
        let response = await postData("/first-factor", data);

        
        if(response && response.status === 202)
        {
            console.log(response)
            await sweetAlert.fire({
                title: 'System Message',
                text: `${response.message}`,
                icon: 'success', // Pode ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'OK'
            });
            localStorage.setItem("id_otp", response.id_OTP);
            localStorage.setItem("expiry_otp", response.expiry)
            this.navigate("/two_factor");
        }
    }

    async secondFactor(otp)
    {
        let id_otp = localStorage.getItem("id_otp") ? localStorage.getItem("id_otp") : undefined;
        
        if(!id_otp  || !otp)
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: `Invalid temporary second factor identification!`,
                icon: 'error', // Pode ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'OK'
            });
            this.navigate("/");
        }

        let data = {
            id:id_otp,
            otp
        };

        const getToken = await postData("/second-factor", data);
        
        if(getToken)
        {
            if(getToken.status === 202)
            {
                localStorage.setItem("token", getToken.token);
                localStorage.removeItem("id_otp");
                localStorage.removeItem("expiry_otp");
                await sweetAlert.fire({
                    title: 'System Message',
                    text: `${getToken.message}`,
                    icon: 'success', // Pode ser 'success', 'error', 'warning', 'info', 'question'
                    confirmButtonText: 'OK'
                });
                this.navigate("/work_hours");
            }
            
        }
        else
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: `Identificação inválida, tente novamente.`,
                icon: 'error', // Pode ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'OK'
            });
        }
        
    }
}