import React from 'react';
import PropTypes from 'prop-types';

class CategoryButton extends React.Component {
  render() {
    console.log('CategoryButton');
    return (
      <div className="column is-3">
        <div className="card" >
          <div className="card-image">
            <figure className="image is-4by3">
              <img alt='Thumbnail' src={this.props.image}></img>
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="category is-4">{this.props.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Specifies the default values for props:
CategoryButton.defaultProps = {
  category: 'item category',
  image: 'http://via.placeholder.com/50x50'
};

// Checks that the correct type of props are supplied:
CategoryButton.propTypes = {
  category: PropTypes.string,
  image: PropTypes.string
};

export default CategoryButton;
