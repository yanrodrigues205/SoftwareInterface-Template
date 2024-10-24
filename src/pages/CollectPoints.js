import React, { useState, useEffect, useCallback } from "react";
import { Col, Container, Row, Button, Modal, Form, Spinner, Alert, AlertHeading } from "react-bootstrap";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import OpenStreetMapSearch from "../components/Address";
import WorkHoursService from "../services/WorkHours";
import "../styles/leaflet.css";
import CollectPointService from "../services/CollectPointService";
import Table from "../components/Table";

export default function CollectPoints() {
    const [dataTable, setDataTable] = useState("");
    const [show, setShow] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedWorkHours, setSelectedWorkHours] = useState('');
    const [loading, setLoading] = useState(true);
    const [idHidden, setIdHidden] = useState("");
    const workHoursService = new WorkHoursService();
    const collectPointService = new CollectPointService();
    const [modalTitle, setModalTitle] = useState("Adicionar novo Ponto de Coleta")
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setModalTitle("Adicionar novo Ponto de Coleta");
        clearForm();
        setShow(true)
    };
    const isVerified = usePrivateRoute(true);

    let fields = [
        {
            name: "Código",
            selector: row => row.id,
            sortable: true
        },
        {
           name: "Nome",
           selector: row => row.name,
           sortable: true 
        },
        {
            name: "Descrição",
            selector: row => row.description,
            sortable: true
        },
        {
            name: "Latitude",
            selector: row => row.latitude,
            sortable: true
        },
        {
            name: "Longitude",
            selector: row => row.longitude,
            sortable: true
        },
        {
            name: "Rua",
            selector: row => row.street,
            sortable: true
        },
        {
            name: "Cidade",
            selector: row => row.city,
            sortable: true
        },
        {
            name: "Estado",
            selector: row => row.state,
            sortable: true
        },
        {
            name: "País",
            selector: row => row.country,
            sortable: true
        },
        {
            name: "Número do Endereço",
            selector: row => row.address_number,
            sortable: true
        },
        {
            name: "Usuário de Coleta",
            selector: row => row.collectUser_id,
            sortable: true
        },
        {
            name: "Horário de Funcionamento",
            selector: row => row.workHours_id,
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
            name: "Data de Desativação",
            selector: row => row.disabled_at,
            sortable: true
        }
    ]

    const changeTable = useCallback(async () => {
        if (isVerified) {
            const response = await collectPointService.getAll();
            setDataTable(response);
        }
    }, [isVerified]); // Remover `collectPointService` das dependências
    

    const handleAddressSelect = (addressData) => {
        setSelectedAddress(addressData);
        console.log("endereço setado no formulário de pontos de coleta: ",addressData);
    };

    async function getWorkHours() {
        try {
            let response = await workHoursService.getAll();
            setOptions(response);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar horários:", error);
        }
    }

    const handleSelectChange = (value) => {
        setSelectedWorkHours(value);
        console.log("ID selecionado:", value);
    };

    useEffect(() => {
        if (isVerified) {
            changeTable();
            getWorkHours();
        }
    }, [isVerified, changeTable]); // Adicionando dependências corretas

    
    async function clearForm()
    {
        setIdHidden("");
        setName("");
        setDescription("")
        setSelectedAddress(null)
        setSelectedWorkHours("")
        setLoading(false);
    }


    async function sendForm()
    {
        if(idHidden.length <= 0)
        {
            await collectPointService.insert(name, description, selectedAddress.lat, selectedAddress.lon, selectedAddress.road, selectedAddress.city, selectedAddress.state, selectedAddress.country, selectedAddress.number, selectedWorkHours);
        }
        else
        {
            await collectPointService.updateOneById(idHidden, name, description, selectedAddress.lat, selectedAddress.lon, selectedAddress.road, selectedAddress.city, selectedAddress.state, selectedAddress.country, selectedAddress.number, selectedWorkHours)
        }
        clearForm();
        handleClose()
        changeTable();
    }

    async function deleteRow(id)
    {
        await collectPointService.deleteById(id);
    }

    async function getRow(id) {
        handleShow();
        clearForm();
        setModalTitle("Alterar Horário de Funcionamento");
        let response = await collectPointService.getOneById(id);
        if (response.id) {
            setIdHidden(response.id);
            setName(response.name);
            setDescription(response.description);
            let address = {
                lat: response.latitude,
                lon: response.longitude,
                road: response.street,
                city: response.city,
                number: response.address_number,
                state: response.state,
                country: response.country
            };
            setSelectedAddress(address);
    
            // Verifica se as opções já estão carregadas
            if (options.length === 0) {
                // Espera o carregamento das opções
                await getWorkHours();
            }
    
            // Agora que as opções estão carregadas, define o selectedWorkHours
            setSelectedWorkHours(response.workHours_id);
            setLoading(false)
        }
    }
    

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2 className="text-primary"><FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp;Pontos de Coleta</h2>
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
                                ></Form.Control>
                                {idHidden && (
                                    <Form.Group>
                                        <Form.Label>Código do Ponto de Coleta</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={idHidden}
                                            readOnly
                                        />
                                    </Form.Group>
                                )}
                                    <Form.Group>
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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
                                </Form>
                                <OpenStreetMapSearch onAddressSelect={handleAddressSelect} selectedAddress={selectedAddress} />

                                <div>
                                    <h5>Selecione um Horário de Funcionamento</h5>
                                    {loading ? (
                                        <div>
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Carregando...</span>
                                            </Spinner>
                                        </div>
                                    ) : (
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        {options && typeof options !== undefined ?  <Form.Control as="select"  value={selectedWorkHours} onChange={(e) => setSelectedWorkHours(e.target.value)}> <option value=""></option>
                                            {options.length > 0 ? options.map((option) => (
                                                <option key={option.id} value={option.id} title={"ID: "+option.id+" - Início as "+option.AMD_first+" pausa as "+option.AMD_second+", Retorno as "+option.BMD_first+" e finalização as "+option.BMD_second + " - "+option.week_days}>
                                                {"ID: "+option.id+" - 🕗 Início as "+option.AMD_first+" pausa as "+option.AMD_second+", Retorno as "+option.BMD_first+" e finalização as "+option.BMD_second + " 🕗 - "+option.week_days}
                                                </option>
                                            )) : ''}
                                        </Form.Control> : <Alert variant="primary" onClose={() => setShow(false)} dismissible><Alert.Heading>Horários de Funcionamento não encontrados!</Alert.Heading><p>Não foi encontrado nenhum horário de funcionamento, adicione ao menos um e tente novamente.</p></Alert>}
                                    </Form.Group>
                                    )}
                                    {selectedWorkHours && <p>Horário selecionado: {selectedWorkHours}</p>}
                                </div>

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
                                <Button variant="secondary">
                                    Fechar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {Array.isArray(dataTable) && dataTable.length > 0 && dataTable ? <Table
                                title="Horários de Funcionamento"
                                data={dataTable} 
                                fields={fields} 
                                onEdit={(id) => getRow(id)}
                                onDelete={(id) => deleteRow(id)}
                            /> : <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>Dados não encontrados</Alert.Heading>
                            <p>
                            Você pode estar recebendo essa mensagem por conta da falta de registros neste setor do sistema, tente realizar adição de um Ponto de Coleta.
                            </p>
                        </Alert>}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
