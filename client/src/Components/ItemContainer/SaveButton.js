import React, {Component} from 'react';
import AddToDbModal from '../BoardsContainer/AddToDbModal';
import PropTypes from 'prop-types';
import Tag from './Tag';

class SaveButton extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
    this.openModalWithItem = this.openModalWithItem.bind(this);
  }

  openModalWithItem(item) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      item: item
    });
  }

  render() {
    let saveButton = <a className="button is-danger" onClick={() => this.openModalWithItem(this.props.item)}>
      <span className="icon is-small">
        <i className="fas fa-heart"></i>
      </span>
      <p>SAVE</p>
    </a>;
    return (
      <div>
        {saveButton}
        <AddToDbModal show={this.state.modalOpen} item={this.state.item} onClose={this.openModalWithItem} url='/addItemToBoard'/>
      </div>
    );
  }
}


// Checks that the correct type of props are supplied:
SaveButton.propTypes = {
  item: PropTypes.object
};

export default SaveButton;
