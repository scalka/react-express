import React, { Component } from 'react';
import Menu from './Components/Menu/Menu'
import ItemContainer from './Components/ItemContainer/ItemContainer'
import BoardsContainer from './Components/BoardsContainer/BoardsContainer'

import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div className="App">
        <Menu/>
        <Route exact path='/' component={ItemContainer}/>
        <Route path='/boardsContainer' component={BoardsContainer}/>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
