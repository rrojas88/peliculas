import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import './ListaUsuarios.css';

class ListaUsuarios extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            logeado: true,
            listado: [],

            info_carga_lista: false,
            info_borra: false,
            mostrar_mensage: false,
            message: ''
        };

        this.confirmarBorrar = this.confirmarBorrar.bind(this);
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token');
        let nickname = sessionStorage.getItem('nickname');
        if( token === undefined || token == null || 
            nickname === undefined || nickname == null )
        {
            this.setState({ logeado: false });
        }
        else{
            this.consultarUsuarios()
        }
    }
   

    consultarUsuarios(  ){
        this.setState({ info_carga_lista: true });

        let url = 'http://localhost/server/api/usuarios';

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
            this.setState({ info_carga_lista: false });
            console.error('Error ==>', error)   
        })
        .then(response => {
            this.setState({ info_carga_lista: false });
            console.log('Hecho:', response)
            if( response.error )
                this.setState({ message: response.message, mostrar_mensage: true });
            else{
                if( response.error ){
                    this.setState({ message: 'Ha ocurrido un error', mostrar_mensage: true });
                }
                else{
                    this.setState({ listado: response.listado });
                }
            }
        });
    }

    confirmarBorrar(event, id ){
        let r = window.confirm("Desea borrar el registro ?");
        if( r == true ){
            this.borrarRegistro( {id: id} )
        }
    }
    borrarRegistro( datos ){
        this.setState({ info_borra: true });
        console.log('Brrado='+datos.id)
        let url = 'http://localhost/server/api/eliminar-usuario';

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
            this.setState({ info_borra: false });
            console.error('Error ==>', error)   
        })
        .then(response => {
            this.setState({ info_borra: false });
            console.log('Hecho:', response)
            if( response.error )
                this.setState({ message: response.message, mostrar_mensage: true });
            else{
                if( response.error ){
                    this.setState({ message: response.message, mostrar_mensage: true });
                }
                else{
                    this.consultarUsuarios()
                }
            }
        });
    }


    render(){

        if( ! this.state.logeado ) return <Redirect to='/' />;

        function Listar(props)
        {
            
            const listadoBD = props.listadoBD;
            const listado = listadoBD.map(( item ) =>{
                let url_edit = '/form-usuarios/'+item.id
                let this_ = this
                return <tr key={item.id}>
                    <td>{ item.id }</td>
                    <td>{ item.nombre }</td>
                    <td>{ item.nickname }</td>
                    <td>
                        <Link to={url_edit}>
                            <button className="btn btn-small waves-effect waves-light blue lighten-3"              
                            >
                                <i className="material-icons left">mode_edit</i>
                            </button>
                        </Link>
                    </td>
                    <td>
                            <button className="btn btn-small waves-effect waves-light red lighten-3" 
                            onClick={(e)=>props.confirmarBorrar(e,item.id)}
                            >
                                <i className="material-icons left">delete_forever</i>
                            </button>
                    </td>
                </tr>
                }
            );
            return (
                listado
            );
        }
        /*const listadoBD = [
            {nombre:'pepe', nickname:'pp',id:1 },
            {nombre:'aaaaa', nickname:'ab',id:2 }
        ];*/
        
        return (
    <div className="row">
    <div className="col s2 m2"></div>
        <div className="col s10 m10">
            <Link to='/inicio'>
                <button className="btn waves-effect waves-light"  component=    {Link} to='/inicio'              
                >
                    Inicio
                    <i className="material-icons left">arrow_back</i>
                </button>
            </Link>
            <Link to='/form-usuarios/0'>
                <button className="btn waves-effect waves-light green lighten-3"  >    
                    <i className="material-icons left">control_point</i>
                </button>
            </Link>
        </div>

        <div className="col s2 m2"></div>
        <div className="col s8 m8">
            <div className="card center-align ">
                <div className="card-content">
                    
                    <h3> Lista de Usuarios </h3>

                    <div > 
                            <div>.</div>
                            { this.state.mostrar_mensage ? (
                                <div className="mensaje-error"> 
                                    {this.state.message} <br /><br />
                                </div>
                            ) : (
                                <p> </p>
                            )}

                            { this.state.info_carga_lista ? (
                                <div className="mensaje-info"> 
                                    Cargando los registros.. <br /><br />
                                </div>
                            ) : (
                                <p> </p>
                            )}

                            { this.state.info_borra ? (
                                <div className="mensaje-info"> 
                                    Borrando el registro.. <br /><br />
                                </div>
                            ) : (
                                <p> </p>
                            )}
                        </div>

                    <table className="striped responsive-table centered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>NICKNAME</th>
                        <th colspan="2">OPCIONES</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Listar listadoBD={this.state.listado} confirmarBorrar={this.confirmarBorrar} />
                    </tbody>
                    </table>
                    
                    <p></p>
                    
                </div>
            </div>
        </div>
        <div className="col s2 m2"></div>
    </div>
        )
    }
}

export default ListaUsuarios