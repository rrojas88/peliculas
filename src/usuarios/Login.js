import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './Login.css';




class Login extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            nickname: '',
            contrasena: '',
            token: '',
            accion: '',
    
            logeado: false,
            mostrar_mensage: false,
            message: '',
            info: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if( ! this.state.nickname.length ){
            this.setState({
                mostrar_mensage: true,
                message: 'El nickname es requerido' });
            return;
        }
        
        if( ! this.state.contrasena.length ){
            this.setState({
                mostrar_mensage: true,
                message: 'La contraseña es requerida' });
            return;
        }

        const datos = {
            nickname: this.state.nickname,
            contrasena: this.state.contrasena
        };


        console.info('enviar', datos)
        this.comprobarLogin( datos )
    }

    comprobarLogin( datos ){
        this.setState({ info: true });

        let url = 'http://localhost/server/api/login';

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(datos),
            headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res => {
            console.log( res )
            return res.json()
        })
        .catch(error => {
            this.setState({ info: false });
            console.error('Error ==>', error)   
        })
        .then(response => {
            this.setState({ info: false });
            console.log('Hecho:', response)
            if( response.error )
                this.setState({ message: response.message, mostrar_mensage: true });
            else{
                if( ! response.registro ){
                    this.setState({ message: 'Nickname o Password incorrecto', mostrar_mensage: true });
                }
                else{
                    sessionStorage.setItem('nickname', response.registro.nickname);
                    sessionStorage.setItem('token', response.registro.token);

                    this.setState({ logeado: true });
                }
            }
        });
    }



    componentDidMount() {
        let token = sessionStorage.getItem('token');
        let nickname = sessionStorage.getItem('nickname');
        if( token !== undefined && token != null && 
            nickname !== undefined && nickname != null ){
            this.setState({ logeado: true });
        }
    }
   

    render(){
        
        if( this.state.logeado ) return <Redirect to='/inicio' />;

        return (
    <div className="row">
        <div className="col s2 m2"></div>
        <div className="col s8 m8">
            <div className="card large center-align form-login">
                <div className="card-content">
                    
                    <h3> Acceso </h3>

                    <form onSubmit={this.handleSubmit} >
                    
                        
                        <div className="input-field col s12">
                            <input id="nickname" type="text" className="validate" value={this.state.nickname} onChange={this.handleChange} />
                            <label for="nickname">Nickname</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="contrasena" type="password" className="validate" value={this.state.contrasena} 
                            onChange={this.handleChange} />
                            <label for="contrasena">contraseña</label>
                        </div>
                        

                        <div className=""> 
                            <div>.</div>
                            { this.state.mostrar_mensage ? (
                                <div className="mensaje-error"> 
                                    {this.state.message} <br /><br />
                                </div>
                            ) : (
                                <p> </p>
                            )}

                            { this.state.info ? (
                                <div className="mensaje-info"> 
                                    Comprobando datos.. <br /><br />
                                </div>
                            ) : (
                                <p> </p>
                            )}
                        </div>
                        <button className="btn waves-effect waves-light"  name="action">
                            Entrar
                            <i className="material-icons right">assignment_ind</i>
                        </button>

                    </form>
                    <p></p>
                    
                </div>
            </div>
        </div>
        <div className="col s2 m2"></div>
    </div>
        )
    }
}

export default Login