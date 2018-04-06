import React, { Component } from 'react';
import ItemCard from './ItemCard';
import { fetchPosts, buildUrl } from '../../buildUrl';
import AddToDbModal from '../BoardsContainer/AddToDbModal';

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      categories: [],
      users: [],
      modalOpen: false,
    };
    this.openModalWithItem = this.openModalWithItem.bind(this);
  }

  openModalWithItem(item) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      item: item
    });
  }

  componentWillMount() {
    const request = buildUrl();
    // fetchPosts from etsy returns promise
    fetchPosts(request).then( response => {
      this.setState({
        data: response.results
      });
    });
  }

  render() {
    //create Item card for each item
    let itemsList = this.state.data.map(item => {
      //add button as a prop to be able to open modal and pass item to modal


      return (
        <ItemCard key={item.listing_id} id={item.listing_id} data={item} title={item.title} tags={item.taxonomy_path} price={item.price} images={item.Images}
        />
      );
    });


    /*    let categories = this.state.data.map(item => {
      console.log(item.category_path);
    })
    */
    return (
      <section className="section">
        <div className="columns is-multiline">
          {itemsList}
        </div>
      </section>
    );
  }
}

export default ItemContainer;
