import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";

import { SCGrid, GridCenter, SCInput, SCInputLabel, SCSelect, SCMenuItem, SCButtonSubmit } from "./styles";
import Menu from "../components/Menu2";
import TablePoints  from "../components/TablePoints";


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


class Dashboard extends Component {
    state = {
        type: "",
        error: "",
        points: [],
        setPoint:"",
    };

    handleSavePoint = async e => {
        e.preventDefault();
        const { type } = this.state;
        if (!type) {
            this.setState({ error: "Preencha o tipo de registro para registrar o ponto!" });
        } else {
            try {
                await api.post("/points", { type });
                this.props.history.push("/dashboard");
            } catch (err) {
                console.log(err);
                this.setState({ error: "Ocorreu um erro ao registrar." });
            }
        }
    };
    createData(type, date) {
        let textType = ''
        switch (type){
            case 1:
                textType = 'Chegada';
                break;
            case 2:
                textType = 'Almoço - Saída';
                break;
            case 3:
                textType = 'Almoço - Chegada';
                break;
            case 4:
                textType = 'Saída';
                break;
            default:
                textType = ''
                break;
        }
        return  [textType, date];
      }
    
      loadPoint = async e => {
        const response = await api.get('/points');
        this.setState({point: response.data})

        let data = [];

        for (let i = 0; i < response.data.length; i++) {
            data.push(this.createData(response.data[i].type,response.data[i].created_at));
            
        }
        console.log(data)
        console.log(typeof(data));

        Object.keys(data).map(k => ( 
                //<TableRow key={this.data[k]._id}>
                console.log(this.data[1][1])
            ));
        
            
        return data
    };


    rows = this.loadPoint();
    



    render() {
        //console.log(rows);
        return (
        <React.Fragment>
            <Menu />
            <SCGrid container xs={12}>
                <SCGrid item lg={3} xs={12} >
                    <GridCenter>
                        <h2>Bater Ponto</h2>
                        {this.state.error && <p>{this.state.error}</p>}
                    </GridCenter>
                    <form onSubmit={this.handleSavePoint}>
                        <SCInputLabel id="typeS">Tipo:</SCInputLabel>
                        <SCSelect 
                            name="type"
                            id="type"
                            labelId="typeS"
                            input={<SCInput />}
                            onChange={e => this.setState({ type: e.target.value })}
                        >
                        
                        <SCMenuItem value="1" >Chegada</SCMenuItem>
                        <SCMenuItem value="2" >Almoço - Saída</SCMenuItem>
                        <SCMenuItem value="3" >Almoço - Chegada</SCMenuItem>
                        <SCMenuItem value="4" >Saída</SCMenuItem>
                    </SCSelect>
                    <GridCenter>
                        <SCButtonSubmit
                            variant="contained"
                            type="submit"
                        >
                            Registrar Ponto
                        </SCButtonSubmit>
                    </GridCenter>
                    </form>
                </SCGrid>
                <SCGrid item lg={9} xs={12} >
                <Paper>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Hora</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {Object.keys(this.rows).map(k => (
                            <TableRow key={this.rows[k]._id}>
                            <TableCell>{this.rows[k][0]}</TableCell>
                            <TableCell>{this.rows[k][1]}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Paper>
                </SCGrid>
            </SCGrid>
            
            
        </React.Fragment>
        );
    }
}

export default withRouter(Dashboard);