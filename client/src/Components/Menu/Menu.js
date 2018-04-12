import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {

  render() {
    return (
      <div>
        <nav className="navbar menu " aria-label="main navigation">
          <div className="is-active navbar-end">
            <span className="navbar-item "><Link to="/">HOME</Link></span>
            <span className="navbar-item "><Link to="/boardsAndItems">BOARDS</Link></span>
          </div>
        </nav>
      </div>
    );
  }
}

export default Menu;
