import React, { Component } from 'react';
import ItemCard from './ItemCard';
import { fetchPosts, buildUrl, buildBasicUrl } from '../../buildUrl';
import AddItemModal from '../BoardsContainer/AddItemModal'

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      categories: [],
      users: [],
      modalOpen: false,
    }
    this.openModalWithItem = this.openModalWithItem.bind(this);
  }

  openModalWithItem(item) {
     this.setState({
        modalOpen: !this.state.modalOpen,
        item: item
     })
  }

  componentWillMount() {

    const request = buildUrl();
    // fetchPosts returns promise
    const listings = fetchPosts(request).then( response => {
      this.setState({
        data: response.results
      });
    });

  }

  componentDidMount() {
    //console.log(this.state.data);
  }

  render() {
    let itemsList = this.state.data.map(item => {
      let saveButton = <a className="button" onClick={() => this.openModalWithItem(item)}>
                        <span className="icon is-small">
                          <i className="fas fa-heart"></i>
                        </span>
                      </a>
      return (
        <ItemCard key={item.listing_id} id={item.listing_id} title={item.title} tags={item.taxonomy_path} price={item.price} images={item.Images}
          button={saveButton}/>
      );
    });


/*    let categories = this.state.data.map(item => {
      console.log(item.category_path);
    })
*/
    return (
      <section className="section">
        <AddItemModal show={this.state.modalOpen}
               item={this.state.item} onClose={this.openModalWithItem}/>

        <div className="columns is-multiline">
          {itemsList}
        </div>
      </section>
    );
  }
}

export default ItemContainer;
