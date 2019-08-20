import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import './FormUsuario.css';


class FormUsuario extends React.Component {

    

    constructor(props) {
        super(props);
        
        this.state = {
            id: 0,
            nombre: '',
            nickname: '',
            contrasena: '',
            contrasena2: '',
    
            token: '',
            accion: '',
    
            redireccionar_lista: false,
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
        if( ! this.state.nombre.length ){
            this.setState({
                mostrar_mensage: true,
                message: 'El nombre es requerido' });
            return;
        }
        if( ! this.state.nickname.length ){
            this.setState({
                mostrar_mensage: true,
                message: 'El nickname es requerido' });
            return;
        }
        if( ! /^[A-Za-z\d\_]+$/.test(this.state.nickname) ){
            this.setState({
                mostrar_mensage: true,
                message: 'El nickname solo puede contener letras, números y \_' });
            return;
        }
        if( ! this.state.contrasena.length ){
            this.setState({
                mostrar_mensage: true,
                message: 'La contraseña es requerida' });
            return;
        }
        if( this.state.contrasena.length < 5 ){
            this.setState({
                mostrar_mensage: true,
                message: 'La contraseña debe tener mínimo 5 caracteres' });
            return;
        }
        if( ! /[\d]+/.test(this.state.contrasena) ){
            this.setState({
                mostrar_mensage: true,
                message: 'La contraseña debe tener al menos un número' });
            return;
        }
        if( ! /[A-Z]+/.test(this.state.contrasena) ){
            this.setState({
                mostrar_mensage: true,
                message: 'La contraseña debe tener al menos una letra mayúscula' });
            return;
        }

        if( ! this.state.contrasena2.length ){
            this.setState({
                mostrar_mensage: true,
                message: 'Debe confirmar la contraseña' });
            return;
        }
        
        if( this.state.contrasena != this.state.contrasena2 ){
            this.setState({
                mostrar_mensage: true,
                message: 'Las contraseñas no coinciden' });
            return;
        }
        
        this.setState({ 
            mostrar_mensage: false,
            message: '' });
        

        const datos = {
            id: this.state.id,
            nombre: this.state.nombre,
            nickname: this.state.nickname,
            contrasena: this.state.contrasena,
            contrasena2: this.state.contrasena2,
            token: this.state.token,
            accion: this.state.accion
        };
        console.info('enviar', datos)
        this.guardar( datos )
    }

   

    guardar( datos ){
        this.setState({ info: true });

        let accion = ( datos.id==0 || datos.id=='0' )? 'nuevo-usuario':'editar-usuario';
        let url = 'http://localhost/server/api/'+accion;

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(datos),
            headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res => {
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
                if( response.error ){
                    this.setState({ message: response.message, mostrar_mensage: true });
                }
                else{
                    this.setState({ redireccionar_lista: true });
                }
            }
        });
    }

    consultar( id ){
        this.setState({ info: true });

        let url = 'http://localhost/server/api/usuarios/'+id;

        fetch(url, {
            method: 'GET',
            mode: 'cors',
            //body: JSON.stringify(datos),
            headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res => {
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
                if( response.error ){
                    this.setState({ message: response.message, mostrar_mensage: true });
                }
                else{
                    this.setState({ 
                        id: response.registro.id,
                        nombre: response.registro.nombre,
                        nickname: response.registro.nickname,
                        contrasena: response.registro.contrasena,
                        contrasena2: response.registro.contrasena
                    });

                    //Materialize.updateTextFields();
                }
            }
        });
    }

    componentDidMount(){
        let id = this.props.match.params.id
        console.info('ID='+id)
        this.setState({ id: id });

        if( id != 0 ){
            this.consultar( id )
        }
    }


    render(){

        if( this.state.redireccionar_lista ) return <Redirect to='/lista-usuarios' />;
        
        return (
    <div className="row">
        <div className="col s2 m2"></div>
        <div className="col s10 m10">
            <button className="btn waves-effect waves-light"  component={Link} to='/inicio'              
            >
                <a href="/inicio">
                    Inicio
                    <i className="material-icons left">arrow_back</i>
                </a>
            </button>
            
        </div>


        <div className="col s2 m2"></div>
        <div className="col s8 m8">
            <div className="card large center-align form-usuarios">
                <div className="card-content">
                    
                    <h3> Usuarios. </h3>

                    <form onSubmit={this.handleSubmit} >
                    
                        <div className="input-field col s12">
                            <input id="nombre" type="text" className="validate" value={this.state.nombre} onChange={this.handleChange} />
                            <label for="nombre">Nombre</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="nickname" type="text" className="validate" value={this.state.nickname} onChange={this.handleChange} />
                            <label for="nickname">Nickname</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="contrasena" type="password" className="validate" value={this.state.contrasena} 
                            onChange={this.handleChange} />
                            <label for="contrasena">contraseña</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="contrasena2" type="password" className="validate" value={this.state.contrasena2} onChange={this.handleChange} />
                            <label for="contrasena2">Confirmar contraseña</label>
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
                                    Procesando datos.. <br /><br />
                                </div>
                            ) : (
                                <p> </p>
                            )}
                        </div>
                        <button className="btn waves-effect waves-light"  name="action">
                            Guardar
                            <i className="material-icons right">save</i>
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

export default FormUsuario