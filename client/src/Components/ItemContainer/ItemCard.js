import React from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';


class ItemCard extends React.Component {
  constructor(){
    super();
    this.addItemToBoard = this.addItemToBoard.bind(this);
  }

  addItemToBoard(event) {
    console.log(this);
    const url = '/addItemToBoard';
    const body = JSON.stringify({
      boardName: 'ssda',
      listing_id: this.props.id,
      title: this.props.title,
      images: this.props.images,
      tags: this.props.tags
    });

  //  <AddBoardModal show={this.state.modalOpen} onClose={this.toggleModal}/>
    /*fetch('/addItemToBoard', {
      method: 'POST',
      body: JSON.stringify({
        boardName: 'ssda',
        listing_id: this.props.id,
        title: this.props.title,
        images: this.props.images,
        tags: this.props.tags
      }),
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) return console.log('record added');
      throw new Error('Request failed');
    })
    .catch(err => {
      console.log(err);
    });*/
  }

  render() {
    console.log('itemcard');
    return (
      <div className="itemCard column is-4">
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={ this.props.images[0] ? this.props.images[0].url_170x135 : 'http://via.placeholder.com/400x400'  } alt={this.props.title}/>

            </figure>
          </div>
          <div className="card-content">
            <p className="title is-size-6">{this.props.title.slice(0, 30) + "..."}</p>
            <p className="subtitle is-7">{this.props.price}</p>
            <div className="content">
              <Tag tags={this.props.tags ? this.props.tags : ["tags"] }/>
            </div>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              {this.props.button}
            </p>
          </footer>
        </div>
      </div>

    );
  }
}

// Specifies the default values for props:
ItemCard.defaultProps = {
  title: 'item title',
  images: [{'url_170x135': 'http://via.placeholder.com/400x400'}],
  tags: ["empty"]
};

// Checks that the correct type of props are supplied:
ItemCard.propTypes = {
  title: PropTypes.string,
  images: PropTypes.array,
  tags: PropTypes.array
};

export default ItemCard;
