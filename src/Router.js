import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './usuarios/Login';
import Inicio from './components/Inicio';

import FormUsuario from './usuarios/FormUsuario';
import ListaUsuarios from './usuarios/ListaUsuarios';

import FormPelicula from './peliculas/FormPelicula';
import ListaPelicula from './peliculas/ListaPelicula';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/inicio' component={Inicio} />
            <Route path='/form-usuarios/:id' component={FormUsuario} />
            <Route path='/lista-usuarios' component={ListaUsuarios} />
            <Route path='/form-peliculas/:id' component={FormPelicula} />
            <Route path='/lista-peliculas' component={ListaPelicula} />
        </Switch>
    </BrowserRouter>
)


export default Router;
