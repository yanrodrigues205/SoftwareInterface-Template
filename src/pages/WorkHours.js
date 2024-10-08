import React, { useCallback, useEffect, useState, useMemo} from "react"
import Table from "../components/Table";
import { Content } from "../styles/WorkHours";
import WorkHoursService from "../services/WorkHours";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import {Form, Button, Modal, Alert, Container, Row, Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function WorkHours()
{
    const [ dataTable, setDataTable ] = useState(null);
    const [idHidden, setIdHidden] = useState("");
    const [AMD_first, setAMD_first] = useState("");
    const [AMD_second, setAMD_second] = useState("");
    const [BMD_first, setBMD_first] = useState("");
    const [BMD_second, setBMD_second] = useState("");
    const [comments, setComments] = useState("");
    const [weekDays, setWeekDays] = useState("Segunda a Sexta.");
    const workHoursService = useMemo(() => new WorkHoursService(), []);
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("Adicionar novo Horário de Funcionamento")
    const handleClose = () => {
        setShow(false)};
    const handleShow = () => {
        setShow(true)
    };

    const isVerified = usePrivateRoute(true);
    
    let fields = [
        {
            name: "Código",
            selector: row => row.id,
            sortable: true,
        },
        {
            name: "Horário de Início",
            selector: row => row.AMD_first,
            sortable: true,
        },
        {
            name: "Horário de Pausa",
            selector: row => row.AMD_second,
            sortable: true
        },
        {
            name:  "Retorno Pós-Pausa",
            selector: row => row.BMD_first,
            sortable: true
        },
        {
            name: "Horário de Finalização",
            selector: row => row.BMD_second,
            sortable: true
        },
        {
            name: "Comentários",
            selector: row => row.comments,
            sortable: true
        },
        {
            name: "Código do Criador",
            selector: row => row.collectUser_id,
            sortable: true
        },
        {
            name: "Data de Criação",
            selector: row => row.created_at,
            sortable: true
        },
        {
            name: "Data de Atualização",
            selector: row => row.updated_at,
            sortable: true
        },
        {
            name: "Dias da Semana",
            selector: row => row.week_days,
            sortable: true
        },
    ];

    const changeTable = useCallback(async () => {
        if(isVerified)
        {
            const response = await workHoursService.getAll();
            console.log("Resposta da API:", response); // Adicione este log
            setDataTable(response);
        }
    }, [isVerified, workHoursService]);

   
    useEffect(() =>{
        if(isVerified)
        {
            changeTable();
        }
    }, [isVerified,changeTable]);

    async function sendForm() // INSERT AND UPDATE
    {   
        if(idHidden.length <= 0)
        {
            await workHoursService.insert(AMD_first, AMD_second, BMD_first, BMD_second, weekDays, comments)
        }
        else
        {
            await workHoursService.updateOneById(idHidden, AMD_first, AMD_second, BMD_first, BMD_second, weekDays, comments)
        }   
        clearForm();
        handleClose();
        changeTable();
    }

    async function deleteRow(id)
    {
        await workHoursService.deleteById(id);
        changeTable();
    }

    async function getRow(id)
    {
        handleShow();
        setModalTitle("Alterar Horário de Funcionamento");
        clearForm();
        let response = await workHoursService.getOneById(id);
        if(response.id)
        {
            setAMD_first(response.AMD_first);
            setAMD_second(response.AMD_second);
            setBMD_first(response.BMD_first);
            setBMD_second(response.BMD_second);
            setComments(response.comments);
            setWeekDays(response.week_days);
            setIdHidden(response.id);
        }
    }

    async function clearForm()
    {
        setIdHidden("");
        setAMD_first("");
        setAMD_second("");
        setBMD_first("");
        setBMD_second("");
        setComments("");
        setWeekDays("");
        setIdHidden("");
    }

    return (
        <Container fluid="md">
            <Row>
                <Col>
                <h2 className="text-primary"><FontAwesomeIcon icon={faClock} />&nbsp;Horários de Funcionamento</h2>
                <Button variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} style={{color: 'white'}}></FontAwesomeIcon> 
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <br/>
                            <Form.Control 
                                type="hidden"
                                value={idHidden}
                                onChange={(e) => setIdHidden(e.target.value)}
                            ></Form.Control>
                            {idHidden && (
                                <Form.Group>
                                    <Form.Label>Código do Resíduo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={idHidden}
                                        readOnly
                                    />
                                </Form.Group>
                            )}
                            <Form.Group>
                                <Form.Label>Horário de Início</Form.Label><br/>
                                <Form.Control 
                                    type="text" 
                                    maxLength="5"
                                    value={AMD_first}
                                    onChange={(e) => setAMD_first(e.target.value)}
                                ></Form.Control>
                            </Form.Group><br/>

                            <div>
                                <Form.Label>Horário de Pausa</Form.Label><br/>
                                <Form.Control 
                                    type="text" 
                                    maxLength="5"
                                    value={AMD_second}
                                    onChange={(e) => setAMD_second(e.target.value)}
                                ></Form.Control>
                            </div><br/>

                            <div>
                                <Form.Label>Retorno Pós-Pausa</Form.Label><br/>
                                <Form.Control 
                                    type="text" 
                                    maxLength="5"
                                    value={BMD_first}
                                    onChange={(e) => setBMD_first(e.target.value)}
                                ></Form.Control>
                            </div><br/>

                            <div>
                                <Form.Label>Horário de Finalização</Form.Label><br/>
                                <Form.Control 
                                    type="text" 
                                    maxLength="5"
                                    value={BMD_second}
                                    onChange={(e) => setBMD_second(e.target.value)}
                                ></Form.Control>
                            </div><br/>

                            <div>
                                <Form.Label>Dias da semana</Form.Label><br/>
                                <Form.Select
                                    onChange={(e) => setWeekDays(e.target.value)}
                                    value={weekDays}    
                                >
                                    <option value="Segunda a Sexta.">Segunda a Sexta.</option>
                                    <option value="Segunda a Sábado.">Segunda a Sábado.</option>
                                    <option value="Todos os Dias.">Todos os Dias.</option>
                                    <option value="Todos os Dias, Exeto feriados.">Todos os Dias, Exeto feriados.</option>
                                </Form.Select>
                            </div><br/>

                            <div>
                                <Form.Label>Comentários</Form.Label><br/>
                                <Form.Control 
                                    as="textarea"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}  
                                ></Form.Control>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            type="button"
                            onClick={sendForm}
                        >
                            Enviar
                        </Button>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={clearForm}
                        >
                            Limpar
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div>
                    
                </div><hr/>
                {Array.isArray(dataTable) && dataTable.length > 0 && dataTable ? <Table
                                title="Horários de Funcionamento"
                                data={dataTable} 
                                fields={fields} 
                                onEdit={(id) => getRow(id)}
                                onDelete={(id) => deleteRow(id)}
                            /> : <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>Dados não encontrados</Alert.Heading>
                            <p>
                            Você pode estar recebendo essa mensagem por conta da falta de registros neste setor do sistema, tente realizar adição de um Horário de Funcionamento.
                            </p>
                        </Alert>}
                </Col>
            </Row>
        </Container>
    )
}