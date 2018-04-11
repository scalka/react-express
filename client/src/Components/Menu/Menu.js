import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import logo from '../../logo.svg';
import AddToDbModal from '../BoardsContainer/AddToDbModal';

class Menu extends Component {

  render() {
    return (
      <div>
        <nav className="navbar menu" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
          </div>
          <div className="is-active navbar-end">
            <span className="navbar-item "><Link to="/boardsAndItems">BOARDS</Link></span>
          </div>
        </nav>
      </div>
    );
  }
}

export default Menu;
