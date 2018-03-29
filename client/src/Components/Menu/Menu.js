import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import logo from '../../logo.svg';
import ItemContainer from '../ItemContainer/ItemContainer'
import BoardsContainer from '../BoardsContainer/BoardsContainer'
import AddBoardModal from '../BoardsContainer/AddBoardModal'

class Menu extends Component {
  constructor(){
    super();
    this.state = {
      modalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    return (
          <div>
            <nav className="navbar menu" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
              </div>
              <div className="is-active navbar-end">
                  <span className="navbar-item "><Link to="/boardsContainer">BOARDS</Link></span>
                  <span className="navbar-item " onClick={this.toggleModal}>ADD BOARD</span>
              </div>
            </nav>

          {/*When the App component first renders, its isOpen state is false, so the Modal is not rendered*/}
          <AddBoardModal show={this.state.modalOpen} onClose={this.toggleModal}/>
        </div>
    )
  }
}

export default Menu;
