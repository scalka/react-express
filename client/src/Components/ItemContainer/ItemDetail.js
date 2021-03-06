import React from 'react';
import SaveButton from './SaveButton';
import Tag from './Tag';
import {deleteFromDB} from '../../dataHelperMethods';
import {DeleteBtn} from './DeleteBtn';

class ItemDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      boardName: ''
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount() {
    if(this.props.location.state) {
      this.setState({
        data: this.props.location.state,
        boardName: this.props.location.boardName
      });
    }
  }

  deleteItem() {
    deleteFromDB(`/delete/${this.state.boardName}/${this.state.data.listing_id}`);
    this.setState({
      boardName: ''
    });
  }

  render() {
    const materials = this.state.data.materials.map( material => {
      return <span key={material}>{material} </span>;
    });
    const categories = this.state.data.category_path.map( cat => {
      return <span key={cat}>{cat} </span>;
    });

    return (
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="box">
                <img src={this.state.data.Images[0].url_570xN} alt={this.state.data.title}/>
                <hr/>
                <Tag tags={this.state.data.tags ? this.state.data.tags : ['tags'] }/>
                <hr/>
                { !this.state.boardName ? <SaveButton item={this.state.data}/> : <DeleteBtn onDelete={this.deleteItem} /> }
              </div>
            </div>
            <div className="column">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">{this.state.data.title}</p>
                </header>

                <div className="card-content">
                  <div className="columns has-text-left">
                    <div className="column">
                      <div className="columns">
                        <div className="column is-one-quarter">
                          <p>CATEGORY</p>
                        </div>
                        <div className="column">
                          <p>{categories}</p>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column is-one-quarter">
                          <p>MATERIALS</p>
                        </div>
                        <div className="column">
                          {materials}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="has-text-left">
                    <p>{this.state.data.description}</p>
                  </div>
                </div>
                <footer className="card-footer">
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
