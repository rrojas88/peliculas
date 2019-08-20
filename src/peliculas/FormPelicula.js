import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import './FormPelicula.css';


class FormPelicula extends React.Component {

    

    constructor(props) {
        super(props);
        
        this.state = {
            id: 0,
            titulo: '',
            sipnosis: '',
            ano: '',
    
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
        if( ! this.state.titulo.length ){
            this.setState({
                mostrar_mensage: true,
                message: 'El titulo es requerido' });
            return;
        }
        if( ! this.state.ano.length ){
            this.setState({
                mostrar_mensage: true,
                message: 'El año es requerido' });
            return;
        }

        if( ! /[\d]{4}/.test(this.state.ano) ){
            this.setState({
                mostrar_mensage: true,
                message: 'Por favor ingrese un año correcto' });
            return;
        }
        let fecha = new Date();
        let anioActual = fecha.getFullYear();
        if( this.state.ano > anioActual ){
            this.setState({
                mostrar_mensage: true,
                message: 'Por favor ingrese un año menor o igual al actual' });
            return;
        }



        this.setState({ 
            mostrar_mensage: false,
            message: '' });

        const datos = {
            id: this.state.id,
            titulo: this.state.titulo,
            sipnosis: this.state.sipnosis,
            ano: this.state.ano,
            
            token: this.state.token,
        };
        console.info('enviar', datos)
        this.guardar( datos )
    }

   

    guardar( datos ){
        this.setState({ info: true });

        let accion = ( datos.id==0 || datos.id=='0' )? 'nueva-pelicula':'editar-pelicula';
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

        let url = 'http://localhost/server/api/peliculas/'+id;

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
                        titulo: response.registro.titulo,
                        sipnosis: response.registro.sipnosis,
                        ano: response.registro.ano
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

        if( this.state.redireccionar_lista ) return <Redirect to='/lista-peliculas' />;
        
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
            <div className="card large center-align form-peliculas">
                <div className="card-content">
                    
                    <h3> Películas </h3>

                    <form onSubmit={this.handleSubmit} >
                    
                        <div className="input-field col s12">
                            <input id="titulo" type="text" className="validate" value={this.state.titulo} onChange={this.handleChange} />
                            <label for="titulo">Título</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="sipnosis" type="text" className="validate" value={this.state.sipnosis} onChange={this.handleChange} />
                            <label for="sipnosis">sipnosis</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="ano" type="text" className="validate" value={this.state.ano} 
                            onChange={this.handleChange} />
                            <label for="ano">Año</label>
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

export default FormPelicula