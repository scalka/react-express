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
    console.log('h');
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    return (

        <div className="Menu">
          <header className="App-header">
            <div className="columns">
              <div className="column">
                <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
              </div>
              <div className="column">
                <Link to="/"><h1 className="App-title">Fav app</h1></Link>
              </div>
              <div className="column">
                <ul>
                  <li className="button is-light"><Link to="/boardsContainer">Boards</Link></li>
                  <li className="button is-light" onClick={this.toggleModal}>Add Board</li>
                </ul>
              </div>
            </div>
          </header>
          {/*When the App component first renders, its isOpen state is false, so the Modal is not rendered*/}
          <AddBoardModal show={this.state.modalOpen} onClose={this.toggleModal}/>
          </div>
    )
  }
}

export default Menu;
