import React, { Component } from 'react';
import Menu from './Components/Menu/Menu'
import ItemContainer from './Components/ItemContainer/ItemContainer'
import BoardsList from './Components/BoardsContainer/BoardsList'

import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div className="App">
        <Menu/>
        <Route exact path='/' component={ItemContainer}/>
        <Route path='/boardsList' component={BoardsList}/>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
