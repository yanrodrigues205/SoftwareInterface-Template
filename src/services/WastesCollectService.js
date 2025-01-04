import { postData } from "./Request";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const sweetAlert = await withReactContent(Swal);

export default class WastesCollectService
{
    #navigate;
    constructor(navigate)
    {
        this.#navigate = navigate;
    }

    async insert(collect_point_id)
    {
        if(!collect_point_id)
        {
            await sweetAlert.fire({
                title: 'Mensagem do Sistema',
                text: 'Preencha todos os campos para concluir a indexação do resíduo ao ponto de coleta.',
                icon: 'question', 
                confirmButtonText: 'OK'
            });
            return;
        }

        let data = {
            collect_point_id
        }

        let response = await postData("/wastes_collect/getall", data, localStorage.getItem("token"));
        let waste;
        let data_2;
        let obj = [];
        for(let i = 0; i < response.length; i++)
        {
            data_2 = {
                waste_id: response[i].waste_id
            }
            waste = await postData("/wastes/getOneById", data_2, localStorage.getItem("token"));
            obj.push(waste);
        }

        // console.log(response);
        return obj;
        
    }
}