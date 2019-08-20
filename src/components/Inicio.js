import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import './Inicio.css';

class Inicio extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            nickname: '',
            logeado: true
        };

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
            let nickname = sessionStorage.getItem('nickname')
            this.setState({ nickname: nickname });
        }
    }

    salir(event){
        sessionStorage.setItem('nickname', '');
        sessionStorage.setItem('token', '');
        sessionStorage.clear();

        this.setState({ logeado: false });
    }
   

    render(){

        /*function salir2(){
            console.info('oprimido x2')
        }*/
        if( ! this.state.logeado ) return <Redirect to='/' />;
        
        return (
    <div className="row">
    <div className="col s2 m2"></div>
        <div className="col s10 m10">
            <button type="button" className="btn waves-effect waves-light" 
                onClick={(e)=>this.salir(e)} >
                Salir
                <i className="material-icons left">arrow_back</i>
            </button>
        </div>

        <div className="col s2 m2"></div>
        <div className="col s8 m8">
            <div className="card large center-align form-login">
                <div className="card-content">
                    
                    <h3> Bienvenido { this.state.nickname } </h3>


                    <Link to='/lista-usuarios'>
                        <button className="btn waves-effect waves-light"  
                        >
                            Administrar Usuarios
                            <i className="material-icons right">apps</i>
                        </button>
                    </Link>

                    <Link to='/lista-peliculas'>
                        <button className="btn waves-effect waves-light"  name="action">
                            Administrar Peliculas
                            <i className="material-icons right">apps</i>
                        </button>
                    </Link>

                    
                    <p></p>
                    
                </div>
            </div>
        </div>
        <div className="col s2 m2"></div>
    </div>
        )
    }
}

export default Inicio