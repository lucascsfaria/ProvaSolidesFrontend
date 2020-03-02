import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";

import { SCGrid, GridCenter, SCInput, SCInputLabel, SCSelect, SCMenuItem, SCButtonSubmit } from "./styles";
import Menu from "../components/Menu";
import TablePoints  from "../components/TablePoints";
import Calendar  from "../components/Calendar";

class Dashboard extends Component {
    state = {
        type: "",
        error: "",
        pointsTable: [],
        pointsCalendar: [],
    };

    handleSavePoint = async e => {
        e.preventDefault();
        const { type } = this.state;
        if (!type) {
            this.setState({ error: "Preencha o tipo de registro para registrar o ponto!" });
        } else {
            try {
                await api.post("/points", { type });
                this.props.history.push("/a");
                this.props.history.push("/dashboard");
            } catch (err) {
                console.log(err);
                this.setState({ error: "Ocorreu um erro ao registrar." });
            }
        }
    };

    loadPoints = async () => {
        try {
            const response = await api.get("/points");
        
            const dataTable = [];
            const dataCalendar = [];

            for (let i = 0; i < response.data.length; i++) {
                dataTable.push(this.createData(response.data[i].type, response.data[i].created_at));
                dataCalendar.push(this.createDataCalendar(response.data[i].type, response.data[i].created_at));
            }
            
            this.setState({ pointsTable: dataTable });
            this.setState({ pointsCalendar: dataCalendar });
        } catch (err) {
          console.log(err);
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
        return  {textType, date};
      }

      createDataCalendar(type, date) {
        let title = '';
        let startDate = date;
        const aux = new Date(date);
        const month = aux.getMonth()>9?aux.getMonth()+1:'0'+ (aux.getMonth()+1)
        const data = aux.getDate()>9?aux.getDate():'0'+ (aux.getDate())
        const hour = aux.getHours()>9?aux.getHours():'0'+ (aux.getHours())
        const minutes = aux.getMinutes()>9?aux.getMinutes():'0'+ (aux.getMinutes())
        const seconds = aux.getSeconds()>9?aux.getSeconds()+1:'0'+ (aux.getSeconds()+1)

        let endDate = `${aux.getFullYear()}-${month}-${data} ${hour}:${minutes}:${seconds}`;

        switch (type){
            case 1:
                title = `Chegada ${date}`;
                break;
            case 2:
                title = `Almoço - Saída ${date}`;
                break;
            case 3:
                title = `Almoço - Chegada ${date}`;
                break;
            case 4:
                title = `Saída ${date}`;
                break;
            default:
                title = ``
                break;
        }
        return  {startDate, endDate, title};
      }

    componentDidMount() {
        this.loadPoints();
    }
    
    render() {
        const { pointsTable, pointsCalendar } = this.state;
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
                    <TablePoints rows={pointsTable} />
                </SCGrid>
                <SCGrid xs={12}>
                    <Calendar data = {pointsCalendar}/>
                </SCGrid>
            </SCGrid>
            
            
        </React.Fragment>
        );
    }
}

export default withRouter(Dashboard);