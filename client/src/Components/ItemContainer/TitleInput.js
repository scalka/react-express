import React from 'react';

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

export default TitleInput;
