import React, {Component} from 'react';
import Menu from './Components/Menu/Menu';
import ItemContainer from './Components/ItemContainer/ItemContainer';
import BoardsAndItems from './Components/BoardsContainer/BoardsAndItemsContainer';
import ItemDetail from './Components/ItemContainer/ItemDetail';

import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div className="App">
          <Menu/>
          <Route exact path='/' component={ItemContainer}/>
          <Route path='/boardsAndItems' component={BoardsAndItems}/>
          <Route path='/itemDetail/:item_id' component={ItemDetail} />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
