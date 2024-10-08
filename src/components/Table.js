import React, {Component} from "react";
import Button  from "react-bootstrap/Button";
import Form  from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

class Table extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            searchText: '',
        };
    }
   

    handleSearch = (event) => {
        this.setState({ searchText: event.target.value });
    };

    render()
    {
        console.log("teste")
        const { title, fields, data, onEdit, onDelete } = this.props;
        const countFields = Array.isArray(fields) ? fields.length : 0;
        const { searchText } = this.state;
       

        if (!Array.isArray(data) || data.length === 0) {
            return <div>Não há registros disponíveis.</div>;
        }

        const countAllData = data.every(one_data => Object.keys(one_data).length === countFields);
        if(!countAllData) {
            return (
                <div>O número de Títulos não correspondem a quantidade de campos por registro.</div>
            )
        }

        const filteredData = data.filter(item => {
            return Object.keys(item).some((key) => {
                const value = item[key];
                return value && value.toString().toLowerCase().includes(searchText.toLowerCase());
            });
        });

        const fieldsWithActions = [
            ...fields,
            {
                name: "Ações",
                cell: (row) => (
                    <div>
                        <Button variant="warning" onClick={() => onEdit(row.id)}>
                            <FontAwesomeIcon icon={faEdit} style={{ color: 'white'}}></FontAwesomeIcon>
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(row.id)}>
                            <FontAwesomeIcon icon={faTrash} style={{ color: 'white'}}></FontAwesomeIcon>
                        </Button>
                    </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
        ];

        return (
            <DataTable
                columns={fieldsWithActions}
                data={searchText && searchText.length > 0 ? filteredData : data}
                pagination
                subHeader
                subHeaderComponent={
                    <Form.Control
                        type="text"
                        placeholder="Pesquisar..."
                        value={searchText}
                        onChange={this.handleSearch}
                    />
                }
            >
                
            </DataTable>
        );
    }
}
export default Table;