import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";

import { SCGrid,
         GridCenter,
         SCInput,
         SCInputLabel,
         SCButtonSubmit,
         SCFormControl } from "./styles";
import Menu from "../components/Menu2";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha todos os dados para cadastrar" });
    } else {
      try {
        await api.post("/users", { username, email, password });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar conta." });
      }
    }
  };

  loadUsers = async () => {
    try {
        const response = await api.get("/points");
    
        const data = [];

        for (let i = 0; i < response.data.length; i++) {
            data.push(this.createData(response.data[i].type, response.data[i].created_at));
            
        }
        
        this.setState({ points: data });
    } catch (err) {
      console.log(err);
    }
  };


  render() {
    return (
    <React.Fragment>
      <Menu />
      <SCGrid container xs={12}>
          <SCGrid item lg={3} xs={12} >
              <GridCenter>
                  <h2>Cadastrar Usuário</h2>
                  {this.state.error && <p>{this.state.error}</p>}
              </GridCenter>
              <form onSubmit={this.handleSignUp}>
                <SCFormControl>
                  <SCInputLabel id="emailLabel">Nome</SCInputLabel>
                  <SCInput id="username"
                           name="username"
                           type="text" 
                           labelId="emailLabel" 
                           onChange={e => this.setState({ username: e.target.value })}/>
                </SCFormControl>
                <SCFormControl>
                  <SCInputLabel id="emailLabel">E-mail</SCInputLabel>
                  <SCInput id="username"
                           name="email"
                           type="email" 
                           labelId="emailLabel" 
                           onChange={e => this.setState({ email: e.target.value })}/>
                </SCFormControl>
                <SCFormControl>
                  <SCInputLabel id="PasswordLabel">Senha:</SCInputLabel>
                  <SCInput id="password"
                           name="password" type="password"
                           labelId="PasswordLabel" 
                           onChange={e => this.setState({ password: e.target.value })}/>
                </SCFormControl>
              <GridCenter>
                  <SCButtonSubmit
                      variant="contained"
                      type="submit"
                  >
                      Cadastrar Usuário
                  </SCButtonSubmit>
              </GridCenter>
              </form>
          </SCGrid>
          <SCGrid item lg={9} xs={12} >
              {/* <TablePoints rows={points} /> */}
          </SCGrid>
      </SCGrid>
      
      
  </React.Fragment>
    );
  }
}

export default withRouter(SignUp);