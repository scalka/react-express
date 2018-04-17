import React, {Component} from 'react';
import ItemCard from './ItemCard';
import {buildUrl, fetchFromDb, fetchPosts, getItemsFromCategoryFromEtsy} from '../../dataHelperMethods';

// Main page
class ItemContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      categories: []
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

    // get available categories from database
    fetchFromDb('/categories').then( response => {
      this.setState({
        categories: response
      });
    });
  }
  // get items from a category and update data for items
  getItemsFromCategory(category) {
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
        <ItemCard key={item.listing_id} id={item.listing_id} data={item} title={item.title}tags={item.taxonomy_path} price={item.price} images={item.Images}/> );
    });

    let categoriesButtons = this.state.categories.map(cat => {
      return ( <button key={cat.categoryName} className="button is-link is-rounded has-margin" onClick={ (e) => this.getItemsFromCategory(cat.categoryName) }>{cat.categoryName}</button> );
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
