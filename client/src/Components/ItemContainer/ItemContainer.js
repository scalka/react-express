import React, { Component } from 'react';
import ItemCard from './ItemCard';
import { fetchPosts, buildUrl, buildBasicUrl } from '../../buildUrl';



class ItemContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filters: [],
      categories: [],
      users: []
    }
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
      return (
        <ItemCard key={item.listing_id} title={item.title} tags={item.taxonomy_path} price={item.price} image={item.Images[0].url_170x135}/>
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
