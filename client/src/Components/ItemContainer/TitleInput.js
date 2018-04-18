import React from 'react';
import PropTypes from 'prop-types';

class TitleInput extends React.Component {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <div className="control ">
              <input name={this.props.name} value={this.props.value} onChange={this.props.handleChange} className="input" type="text" placeholder={this.props.label} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
;

// Checks that the correct type of props are supplied:
TitleInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string
};
export default TitleInput;
