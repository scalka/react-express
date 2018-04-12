import React, { Component } from 'react';
import { fetchFromDb } from '../../dataHelperMethods';
import {ModalBody} from './ModalElements';

// Dropdown with all boards in db

class BoardsList extends Component {
  constructor() {
    super();
    this.state = {
      boards: []
    };
  }
  componentWillMount() {
    fetchFromDb('/boardsCollection').then( response => {
      this.setState({
        boards: response
      });
    });
  }

  render() {
    let boards = this.state.boards.map(board => {
      return(<option key={board.boardName} value={board.boardName}>{board.boardName}</option>);
    });

    return (

      <div className="field">
        <label className="has-text-primary is-size-4">Select a board: </label>
        <div className="select">
          <select className="dropdown" value={this.props.selected} name={this.props.name} onChange={this.props.handleChange}>
            {boards}
          </select>
        </div>
      </div>

    );
  }
}

export default BoardsList;
