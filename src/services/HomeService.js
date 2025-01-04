import { postData } from "./Request";

export default class HomeService
{
    #navigate;
    constructor(navigate)
    {
        this.#navigate = navigate;
    }

    async getAuthenticationData(redirect = false)
    {
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

        if(!token)
        {
            if(redirect)
            {
                this.#navigate("/");
            }
            return false;
        }

        let data = {
            token
        };

        const resp = await postData("/verify", data, false, false);
        

        if(!resp || (resp && typeof resp !== "object"))
        {
            if(redirect)
            {
                this.#navigate("/");
            }
            return false;
        }

        return resp;
    }

}