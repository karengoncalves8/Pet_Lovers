import React, { Component } from 'react';
import { withRouter } from '../../routes/withRouter';

import './style.css';

import logo from '../../assets/logo/logo.svg';

import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import { AiFillHome, AiFillProduct } from "react-icons/ai";
import { FaHandHolding, FaPaw, FaShoppingBasket, FaUserCircle } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { BsPersonVcardFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

type SidebarProps = {
  location: { pathname: string };
  navigate: (path: string) => void;
};

type SidebarState = {
  collapsed: boolean;
};

class Sidebar extends Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);

    this.state = {
      collapsed: true
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleResponsiveNav = this.toggleResponsiveNav.bind(this);
  }

  toggleNavbar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('collapsed');
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  }

  toggleResponsiveNav() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('menu-active');
    sidebar?.classList.remove('collapsed');
  }

  render() {
    const { pathname } = this.props.location;
    const { collapsed } = this.state;

    return (
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <header className="sidebar-header">
          <img src={logo} className="header-logo" alt="Logo" />
          {collapsed 
            ? <BiSolidChevronRightSquare className="toggler-icon icon" onClick={this.toggleNavbar} />
            : <BiSolidChevronLeftSquare className="toggler-icon icon" onClick={this.toggleNavbar} />
          }
          <RxHamburgerMenu className="menu-icon icon" onClick={this.toggleResponsiveNav} />
        </header>

        <nav className="sidebar-nav">
          <ul className="nav-list routes-nav">
            <li className={pathname === '/Dashboard' ? 'nav-item active' : 'nav-item'} onClick={() => this.props.navigate('/Dashboard')}>
              <div className="nav-link">
                <AiFillHome className="icon" />
                <span className="nav-label">Dashboard</span>
              </div>
              <span className="nav-tooltip">Dashboard</span>
            </li>
            <li className={pathname === '/Produtos' ? 'nav-item active' : 'nav-item'} onClick={() => this.props.navigate('/Produtos')} >
              <div className="nav-link">
                <AiFillProduct className="icon" />
                <span className="nav-label">Produtos</span>
              </div>
              <span className="nav-tooltip">Produtos</span>
            </li>
            <li className={pathname === '/Servicos' ? 'nav-item active' : 'nav-item'} onClick={() => this.props.navigate('/Servicos')}>
              <div className="nav-link">
                <FaHandHolding className="icon" />
                <span className="nav-label">Serviços</span>
              </div>
              <span className="nav-tooltip">Serviços</span>
            </li>
            <li className={pathname === '/Clientes' ? 'nav-item active' : 'nav-item'}  onClick={() => this.props.navigate('/Clientes')}>
              <div className="nav-link">
                <HiUsers className="icon" />
                <span className="nav-label">Clientes</span>
              </div>
              <span className="nav-tooltip">Clientes</span>
            </li>
            <li className={pathname === '/Pets' ? 'nav-item active' : 'nav-item'} onClick={() => this.props.navigate('/Pets')}>
              <div className="nav-link">
                <FaPaw className="icon" />
                <span className="nav-label">Pets</span>
              </div>
              <span className="nav-tooltip">Pets</span>
            </li>
            <li className={pathname === '/Vendas' ? 'nav-item active' : 'nav-item'} onClick={() => this.props.navigate('/Vendas')}>
              <div className="nav-link">
                <FaShoppingBasket className="icon" />
                <span className="nav-label">Vendas</span>
              </div>
              <span className="nav-tooltip">Vendas</span>
            </li>
          </ul>

          <ul className="nav-list actions-nav">
            {/* <li className="nav-item">
              <div className="nav-link">
                <FaUserCircle className="icon" />
                <span className="nav-label">Perfil</span>
              </div>
              <span className="nav-tooltip">Perfil</span>
            </li> */}
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
  }
}

export default withRouter(Sidebar);
