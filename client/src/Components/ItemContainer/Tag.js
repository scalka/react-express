import React from 'react';
import PropTypes from 'prop-types';

class Tag extends React.Component {
  render() {
    let tags = this.props.tags.map( item => {
      return (
        <span className="tag is-primary" key={item}>{item}</span>
      );
    });
    return tags;
  }
}
// Specifies the default values for props:
Tag.defaultProps = {
  tagName: 'Tag Name'
};

// Checks that the correct type of props are supplied:
Tag.propTypes = {
  tagName: PropTypes.string
};

export default Tag;
