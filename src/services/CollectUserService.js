import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getData, postData, deleteData, putData } from "./Request";

const sweetAlert = withReactContent(Swal);


export default class CollectUserService
{
    constructor(navigate)
    {
        this.navigate = navigate;
    }

    async insert(name, cnpj, phone, description)
    {
        if(!name || !cnpj || !phone || !description)
        {
            await sweetAlert.fire({
                title: "System Message",
                text: "Preencha todos os campos para concluir o cadastro de usuário de coleta.",
                icon: "question"
            });
            return;
        }

        let data = {
            name,
            cpf_cnpj: cnpj,
            phone,
            description
        }

        let response = await postData("/collect_user/insert", data, localStorage.getItem("token"));

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
        else
        {
            await sweetAlert.fire({
                title: 'System Message',
                text: `${response.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

    }

    async getOne(id)
    {
        if(!id)
        {
            await sweetAlert.fire({
                title: "Mensagem do Sistema",
                text: "Preencha a identificação ID para concluir a busca de usuário de coleta por ID.",
                icon: "question"
            });
            return;
        }

        let data = {
            id
        }

        let response = await postData("/collect_user/getCollectUserById", data);

        if(response)
        {
        console.log("Usuario de coleta no service",response);
          return response;
        }
        else
        {
            return false;
        }
    }
}