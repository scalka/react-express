import React from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';


class ItemCard extends React.Component {
  constructor(){
    super();
  }

  render() {
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
