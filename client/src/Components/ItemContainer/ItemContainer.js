import React, { Component } from 'react';
import ItemCard from './ItemCard';
import {fetchPosts, buildUrl, getItemsFromCategoryFromEtsy, fetchFromDb} from '../../dataHelperMethods';

class ItemContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filters: [],
      categories: [],
      users: []
    };

    this.getItemsFromCategory = this.getItemsFromCategory.bind(this);
  }

  componentWillMount() {
    const itemsRequest = buildUrl();


    // fetchPosts from etsy returns promise
    fetchPosts(itemsRequest).then( response => {
      this.setState({
        data: response.results
      });
    });

    // fetchPosts from etsy returns promise
    fetchFromDb('/categories').then( response => {
      console.log(response);
      this.setState({
        categories: response
      });
    });

    /*// fetchPosts from etsy returns promise
    fetchPosts(categoriesUrl).then( response => {
      console.log(response);
      this.setState({
        categories: response.results
      });
    });*/
  }

  getItemsFromCategory(category) {
    console.log(category);
    const getItemsFromCatUrl = getItemsFromCategoryFromEtsy(category);
    fetchPosts(getItemsFromCatUrl).then( response => {
      this.setState({
        data: response.results
      });
    });
  }

  render() {
    //create Item card for each item
    let itemsList = this.state.data.map(item => {
      return (
        <ItemCard key={item.listing_id} id={item.listing_id} data={item} title={item.title} tags={item.taxonomy_path} price={item.price} images={item.Images}
        />
      );
    });

    let categoriesButtons = this.state.categories.map(cat => {
      return (
        <button className="button" onClick={ (e) => this.getItemsFromCategory(cat.categoryName) }>{cat.categoryName}</button>
      );
    });
    return (
      <div>
        <section className="section">
          {categoriesButtons}
        </section>
        <section className="section">
          <div className="columns is-multiline">
            {itemsList}
          </div>
        </section>

      </div>
    );
  }
}

export default ItemContainer;
