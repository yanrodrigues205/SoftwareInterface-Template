import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { postData } from "../services/Request";
const sweetAlert = await withReactContent(Swal);

export const usePrivateRoute = (verifyCollectUser) => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified ] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            let token =  localStorage.getItem("token");
            if(!token || token.length <= 0)
            {
                await sweetAlert.fire({
                    title: 'System Message',
                    text: 'To access this environment, authentication is required on the system.',
                    icon: 'error', 
                    confirmButtonText: 'OK'
                });
                navigate("/");
            }
            let data = {
                token
            };

            const resp = await postData("/verify", data);
            
            if(!resp || typeof resp !== "object")
            {
                await sweetAlert.fire({
                    title: 'System Message',
                    text: 'Your identification token is invalid, authenticate again, we are sorry!',
                    icon: 'error', 
                    confirmButtonText: 'OK'
                });
                navigate("/");
            }

            if(verifyCollectUser)
            {
                if(!resp.collect_user_id)
                {
                    await sweetAlert.fire({
                        title: 'System Message',
                        text: 'To access this environment it is necessary to use a collection user, create one and return to this location.',
                        icon: 'error', 
                        confirmButtonText: 'OK'
                    });
                    navigate("/");
                }
            }

            setIsVerified(true);
        }

        checkToken();
    }, [verifyCollectUser, navigate])

    return isVerified;
}