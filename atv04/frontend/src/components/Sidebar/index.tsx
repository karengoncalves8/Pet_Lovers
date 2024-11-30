import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './style.css';

import logo from '../../assets/logo/logo.svg';

import { 
  BiSolidChevronLeftSquare, 
  BiSolidChevronRightSquare 
} from "react-icons/bi";

import { 
  AiFillHome, 
  AiFillProduct 
} from "react-icons/ai";

import { 
  FaHandHolding, 
  FaPaw, 
  FaShoppingBasket 
} from "react-icons/fa";

import { HiUsers } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('collapsed');
    setCollapsed(!collapsed);
  };

  const toggleResponsiveNav = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('menu-active');
    sidebar?.classList.remove('collapsed');
  };

  const { pathname } = location;

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <header className="sidebar-header">
        <img src={logo} className="header-logo" alt="Logo" />
        {collapsed 
          ? <BiSolidChevronRightSquare className="toggler-icon icon" onClick={toggleNavbar} />
          : <BiSolidChevronLeftSquare className="toggler-icon icon" onClick={toggleNavbar} />
        }
        <RxHamburgerMenu className="menu-icon icon" onClick={toggleResponsiveNav} />
      </header>

      <nav className="sidebar-nav">
        <ul className="nav-list routes-nav">
          <li className={pathname === '/Dashboard' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('/Dashboard')}>
            <div className="nav-link">
              <AiFillHome className="icon" />
              <span className="nav-label">Dashboard</span>
            </div>
            <span className="nav-tooltip">Dashboard</span>
          </li>
          <li className={pathname === '/Produtos' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('/Produtos')}>
            <div className="nav-link">
              <AiFillProduct className="icon" />
              <span className="nav-label">Produtos</span>
            </div>
            <span className="nav-tooltip">Produtos</span>
          </li>
          <li className={pathname === '/Servicos' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('/Servicos')}>
            <div className="nav-link">
              <FaHandHolding className="icon" />
              <span className="nav-label">Serviços</span>
            </div>
            <span className="nav-tooltip">Serviços</span>
          </li>
          <li className={pathname === '/Clientes' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('/Clientes')}>
            <div className="nav-link">
              <HiUsers className="icon" />
              <span className="nav-label">Clientes</span>
            </div>
            <span className="nav-tooltip">Clientes</span>
          </li>
          <li className={pathname === '/Pets' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('/Pets')}>
            <div className="nav-link">
              <FaPaw className="icon" />
              <span className="nav-label">Pets</span>
            </div>
            <span className="nav-tooltip">Pets</span>
          </li>
          <li className={pathname === '/Vendas' ? 'nav-item active' : 'nav-item'} onClick={() => navigate('/Vendas')}>
            <div className="nav-link">
              <FaShoppingBasket className="icon" />
              <span className="nav-label">Vendas</span>
            </div>
            <span className="nav-tooltip">Vendas</span>
          </li>
        </ul>

        <ul className="nav-list actions-nav">
          <li className="nav-item logout">
            <div className="nav-link">
              <FiLogOut className="icon" />
              <span className="nav-label">Sair</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
