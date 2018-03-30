import React, { Component } from 'react';

class BoardsContainer extends Component {
  constructor() {
    super();
    this.state = {
      boards: []
    }
  }
  componentWillMount() {
    console.log('BoardsContainer');
    fetch('/boardsCollection')
      .then(res => {
        if(res.ok) return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          boards: data
        })
      })
      .catch(error => console.log(error));

  }

  render() {
    let boards = this.state.boards.map(board => {
      console.log(board);
      return(<h1 key={board.boardName}>{board.boardName}</h1>);
    });
    return (
      <section className="section">
        <h1 className="has-text-primary is-size-4">Boards</h1>
        {boards}
      </section>
    );
  }
}

export default BoardsContainer;
