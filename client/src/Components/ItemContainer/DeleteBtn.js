import React from 'react';

export const DeleteBtn = (props) => {
  return (
    <a className="button is-danger" onClick={props.onDelete}><span className="icon is-small">
      <i className="fas fa-trash"></i>
    </span> <p>Delete</p></a>);
};
