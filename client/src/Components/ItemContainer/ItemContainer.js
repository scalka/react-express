import React, {Component} from 'react';
import ItemCard from './ItemCard';
import TitleInput from './TitleInput';
import {buildUrl, fetchFromDb, fetchPosts, getItemsFromCategoryFromEtsy} from '../../dataHelperMethods';

// Main page
class ItemContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      categories: [],
      searchTitle: ''
    };
    this.handleChange = this.handleChange.bind(this);
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
  // handle search input
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    //create Item card for each item
    let itemsList = this.state.data.map(item => {
      const titleMatch = item.title.startsWith(this.state.searchTitle);
      return (titleMatch) ? (<ItemCard key={item.listing_id} id={item.listing_id} data={item} title={item.title}tags={item.taxonomy_path} price={item.price} images={item.Images}/> ) : null;
    });

    let categoriesButtons = this.state.categories.map(cat => {
      return ( <button key={cat.categoryName} className="button is-link is-rounded has-margin" onClick={ (e) => this.getItemsFromCategory(cat.categoryName) }>{cat.categoryName}</button> );
    });

    return (
      <div>
        <section className="section">
          {categoriesButtons}
          <div className="column is-3"><TitleInput name="searchTitle" label="Search items" value={this.state.searchTitle} handleChange={this.handleChange} /></div>
          <div className="columns is-multiline">
            {itemsList}
          </div>
        </section>
      </div>
    );
  }
}

export default ItemContainer;
