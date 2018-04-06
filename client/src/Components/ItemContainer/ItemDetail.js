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
    return ( <h1>hi</h1>);
  }
}

export default ItemDetail;

/*export const ItemDetail = ({ match }) => {
  return (<div>
    {match.params.item_id}
  </div>);
};
*/
