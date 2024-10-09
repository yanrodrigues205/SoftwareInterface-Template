import React, {useCallback, useEffect, useState, useMemo} from "react";
import {Form, Button, Modal, Alert, Container, Row, Col} from "react-bootstrap";
import WastesService from "../services/WastesService";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import Table from "../components/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Wastes()
{
    const [dataTable, setDataTable] = useState(null);
    const [modalTitle, setModalTitle] = useState("Adicionar novo Resíduo");
    const [idHidden, setIdHidden] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription ] = useState("");
    const [classification, setClassification] = useState("No_degree_of_danger");
    const [unitOfMeasure, setUnitOfMeasure] = useState("Kilogram");
    const [value, setValue] = useState("");
    const [disabledAt, setDisabledAt] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setModalTitle("Adicionar novo Resíduo");
        setShow(false)};//modal
    const handleShow = () => {
        clearForm();
        setShow(true)
    };//modal
    const wastesService = useMemo(() => new WastesService(), []);
    const isVerified = usePrivateRoute(true);
    let rotulo = [
        {
            name: "Código",
            selector: row => row.id,
            sortable: true,
        },
        {
            name: "Tipo do Resíduo",
            selector: row => row.type,
            sortable: true
        },
        {
            name: "Descrição",
            selector: row => row.description,
            sortable: true
        },
        {
            name: "Classificação de Perigo",
            selector: row => row.classification,
            sortable: true
        },
        {
            name: "Unidade de Medida",
            selector: row => row.unit_of_measure,
            sortable: true
        },
        {
            name: "Valor de Comércio",
            selector: row => row.value,
            sortable: true
        },
        {
            name: "Data de Desativação",
            selector: row => row.disabled_at,
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
    ]

    const changeTable = useCallback(async () => {
        if(isVerified)
        {
            let response = await wastesService.getall();
            console.log("carregando dados da tabela", response)
            setDataTable(response);
        }
    }, [isVerified, wastesService])

    async function clearForm()
    {
        setModalTitle("Adicionar novo Resíduo");
        setIdHidden("");
        setType("");
        setClassification("");
        setDescription("");
        setUnitOfMeasure("No_degree_of_danger")
        setClassification("Kilogram");
        setValue("");
        setDisabledAt("");
    }

    async function sendForm()
    {
        if(idHidden && idHidden.length > 0)
        {
            await wastesService.updateById(idHidden, type, description, classification, unitOfMeasure, value)
        }
        else
        {
            await wastesService.insert(type, description, classification, unitOfMeasure, value);
        }
        changeTable();
        handleClose();
    }

    async function deleteRow(id)
    {
        console.log(id)
        await wastesService.deleteById(id)
        changeTable();
    }

    async function getRow(id)
    {
        handleShow();
        let response = await wastesService.getOneByID(id);
        setModalTitle("Alterar Resíduo");
        setIdHidden(response.id);
        setType(response.type);
        setDescription(response.description);
        setClassification(response.classification);
        setUnitOfMeasure(response.unit_of_measure);
        setValue(response.value);


    }

    useEffect(() => {
        if(isVerified)
        {
            changeTable();
        }

        if(idHidden)
        {
            console.log("novo valor de idHidden", idHidden)
        }
    }, [isVerified, changeTable, idHidden])


    return (
        <>
            <Container fluid="md">
                <Row>
                    <Col>
                        <h2 className="text-primary"><FontAwesomeIcon icon={faRecycle} />&nbsp;Resíduos</h2>
                        <Button variant="primary" onClick={handleShow}>
                            <FontAwesomeIcon icon={faPlus} style={{color: 'white'}}></FontAwesomeIcon> 
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>{modalTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Control
                                        type="hidden"
                                        value={idHidden}
                                        onChange={(e) => setIdHidden(e.target.value)}
                                    >
                                    </Form.Control>
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
                                        <Form.Label>Tipo de Resíduo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Classificação de Perigo</Form.Label>
                                        <Form.Select
                                            onChange={(e) => setClassification(e.target.value)}
                                            value={classification}
                                        >
                                            <option value="High">Alto</option>
                                            <option value="Avarage">Médio</option>
                                            <option value="Low">Baixo</option>
                                            <option value="No_degree_of_danger">Sem grau de Periculosidade</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Unidade de Medida</Form.Label>
                                        <Form.Select
                                            onChange={(e) => setUnitOfMeasure(e.target.value)}
                                            value={unitOfMeasure}
                                        >
                                            <option value="Kilogram">Quilograma</option>
                                            <option value="Gram">Grama</option>
                                            <option value="Ton">Toneladas</option>
                                            <option value="Liter">Litro</option>
                                            <option value="Mililiter">Mililitro</option>
                                            <option value="Unit">Unidade</option>
                                            <option value="Pack">Pacote</option>
                                            <option value="Barrel">Barril</option>
                                            <option value="SquareMeter">Metro Quadrado</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Valor</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Control
                                            type="hidden"
                                            value={disabledAt}
                                            onChange={(e) => setDisabledAt(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
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
                        
                
                        {Array.isArray(dataTable) && dataTable.length > 0 && dataTable ? <Table
                            title="Meus Resíduos"
                            data={dataTable}
                            fields={rotulo}
                            onEdit={(id) => getRow(id)}
                            onDelete={(id) => deleteRow(id)}
                        >
                        </Table> : <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                        <Alert.Heading>Dados não encontrados</Alert.Heading>
                                        <p>
                                        Você pode estar recebendo essa mensagem por conta da falta de registros neste setor do sistema, tente realizar adição de Resíduo.
                                        </p>
                                    </Alert>}
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}