import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Alert, Table } from 'reactstrap';

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formFields: {title: '',caption: '',type:'main',is_active: true},
            msg : 0,
            allData : []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let formFields = {...this.state.formFields};
        formFields[e.target.name] = e.target.value;
        if(e.target.name === 'is_active')
            formFields[e.target.name] = e.target.checked;
        this.setState({
            formFields
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let formFields = this.state.formFields;
        let allData = this.state.allData;
        allData.push(formFields);
        var self = this;
        axios.post('http://demo9606913.mockable.io/save',formFields )
            .then(function(response){
                self.setState({
                    msg: response.status
                });
            })
            .catch(function(error){
                self.setState({
                    msg: error
                });
            });
    }

    render() {
        let msgContainer = null;
        const { allData } = this.state;
        if(this.state.msg !== 0){
            if(this.state.msg === 200){
                msgContainer = <Alert color="success">
                    Form have been saved successfully
                </Alert>
            }else{
                msgContainer = <Alert color="danger">
                    Something Goes Wrong !
                </Alert>
            }
        }
        return (
            <div className="col-xl-12">
                <Form className="col-xl-6" onSubmit={this.handleSubmit}>
                    {msgContainer}
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title"
                               value={this.state.title} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="caption">Caption</Label>
                        <Input type="text" name="caption" id="caption"
                               value={this.state.caption} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="select" name="type" id="type"
                               value={this.state.type} onChange={this.handleChange}>
                            <option value="main">Main</option>
                            <option value="sub">Sub</option>
                            <option value="secondary">Secondary</option>
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="is_active" onChange={this.handleChange} /> Active
                        </Label>
                    </FormGroup>
                    <Button className="mt-3" color="primary" size="m" type="submit">Save</Button>
                </Form>
                <div className="col-xl-6 mt-3">
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Caption</th>
                            <th>Type</th>
                            <th>Active</th>
                        </tr>
                        </thead>
                        <tbody>
                            {allData.map((item) => (
                                <tr>
                                    <th scope="row">{item.title}</th>
                                    <td>{item.caption}</td>
                                    <td>{item.type}</td>
                                    <td>{item.is_active?"Active":"Not Active"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
export default FormComponent;