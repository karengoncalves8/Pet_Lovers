import React, { Component } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import '../style/global.css';

import Produtos from "../pages/Produtos";
import Login from "../pages/Login";
import Layout from "./layoult";
import Servicos from '../pages/Servicos';
import Clientes from '../pages/Clientes';
import Pets from '../pages/Pets'
import Vendas from '../pages/Vendas';
import NovaVenda from '../pages/NovaVenda';
import DashBoard from '../pages/DashBoard';

class MainRoutes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          {/* Rota de Login */}
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Navigate to="/Dashboard" />} />

          <Route element={<Layout />}>
            <Route path="/Produtos" element={<Produtos />} />
            <Route path="/Dashboard" element={<DashBoard />} />
            <Route path="/Servicos" element={<Servicos />} />
            <Route path="/Clientes" element={<Clientes />} />
            <Route path="/Pets" element={<Pets />} />
            <Route path="/Vendas" element={<Vendas />} />
            <Route path="/NovaVenda" element={<NovaVenda />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default MainRoutes;
