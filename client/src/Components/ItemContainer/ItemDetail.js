import React from 'react';

class ItemDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    console.log(this.props);
    if(this.props.location.state) {
      this.setState({
        data: this.props.location.state
      });
    } else {
      this.setState({
        data: this.props.history.state
      });
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div class="box">
                <img src={this.state.data.Images[0].url_570xN}/>
              </div>
            </div>
            <div className="column">
              <div class="box">
                <h1>{this.state.data.title}</h1>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;

/*export const ItemDetail = ({ match }) => {
  return (<div>
    {match.params.item_id}
  </div>);
};
*/
