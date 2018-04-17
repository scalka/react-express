import React, {Component} from 'react';
import {fetchFromDb} from '../../dataHelperMethods';
import AddToDbModal from './AddToDbModal';
import {Link} from 'react-router-dom';

class BoardsAndItems extends Component {
  constructor() {
    super();
    this.state = {
      boards: [],
      modalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);

  }

  componentWillMount() {
    fetchFromDb('/boardsCollection').then( response => {
      this.setState({
        boards: response
      });
    });
  }

  // open or close modal
  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
    // fetch all boards to include the added one
    if(!this.modalOpen) {
      fetchFromDb('/boardsCollection').then( response => {
        this.setState({
          boards: response
        });
      });
    }
  }

  render() {
    let boards = this.state.boards.map(board => {
      let items = [];
      for (let item of board.items) {
        items.push(
          <li className="items-li" key={board.boardName + item.listing_id}>
            <Link to={{
              pathname: `/itemDetail/${item.listing_id}`,
              state: item,
              boardName: board.boardName
            }}>
              <img className="" src={item.Images[0].url_75x75} alt={item.title}/>
            </Link>
          </li>);
      }
      return(
        <div className="column is-4" key={board._id}>
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                {board.boardName.toUpperCase()}
              </p>
            </header>
            <div className="card-content">
              <ul className="items-ul">
                {items}
              </ul>
            </div>
          </div>
        </div>);
    });

    return (
      <section className="section">
        <button className="button is-primary is-pulled-right" onClick={this.toggleModal}>ADD BOARD</button>
        <h1 className="has-text-primary title">BOARDS</h1>
        <div className="container is-fluid">
          <div className="columns is-multiline is-4">
            {boards}
          </div>
        </div>
        {/*When the App component first renders, its isOpen state is false, so the Modal is not rendered*/}
        <AddToDbModal show={this.state.modalOpen} onClose={this.toggleModal} url='/addBoardToCollection'/>
      </section>
    );
  }
}

export default BoardsAndItems;
