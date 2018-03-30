import React, { Component } from 'react';
import { fetchFromDb } from '../../buildUrl';

class BoardsList extends Component {
  constructor() {
    super();
    this.state = {
      boards: []
    }
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
      /*console.log(board);*/
      return(
/*        <li>
          <a key={board.boardName}>{board.boardName}</a>
        </li>*/
        <option key={board.boardName} value={board.boardName}>{board.boardName}</option>
      );
    });
    console.log(boards);
    return (
      <section className="section">
        <h1 className="has-text-primary is-size-4">Boards</h1>
        <ul>{boards}</ul>
        <select value={this.props.selected} name={this.props.name} onChange={this.props.handleChange}>
          {boards}
        </select>
      </section>
    );
  }
}

export default BoardsList;
