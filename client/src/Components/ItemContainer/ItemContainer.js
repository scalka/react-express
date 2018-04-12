import React, {Component} from 'react';
import ItemCard from './ItemCard';
import {buildUrl, fetchFromDb, fetchPosts, getItemsFromCategoryFromEtsy} from '../../dataHelperMethods';

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
  // get all available categories from database
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
        <ItemCard key={item.listing_id} id={item.listing_id} data={item} title={item.title} tags={item.taxonomy_path} price={item.price} images={item.Images}
        />
      );
    });

    let categoriesButtons = this.state.categories.map(cat => {
      return (
        <button key={cat.categoryName} className="button is-link is-rounded" onClick={ (e) => this.getItemsFromCategory(cat.categoryName) }>{cat.categoryName}</button>
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
