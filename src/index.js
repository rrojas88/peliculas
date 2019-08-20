import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './components/Header'

//import Login from './usuarios/Login';
//import FormUsuario from './usuarios/FormUsuario';
import Router from './Router';
import Inicio from './components/Inicio';

import * as serviceWorker from './serviceWorker';

const Root = () => {
    return (
        <div>
            <Header />

            <div className="contenedor">
                
                <Router />

            </div>
        </div>
    )
}
ReactDOM.render(<Root />, document.getElementById('root') )
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
