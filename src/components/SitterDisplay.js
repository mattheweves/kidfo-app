import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import SitterProfile from './SitterProfile';

class SitterDisplay extends React.Component {

  render() {
    const { sitter, getSitter } = this.props;

    return (
      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card-panel grey lighten-5 z-depth-1">
            <div className="row valign-wrapper">
              <div className="col s4">
                { sitter.image ? <img src={sitter.image.url} alt="" className="circle responsive-img"></img> : "" }
              </div>
              <div className="col s6 left-align">
                <span className="black-text left-align" onClick={() => getSitter(sitter.id)}>
                  <h5><Link to={`sitters/${sitter.id}`}>{ sitter.first_name } { sitter.last_name }</Link></h5><br />
                  <p>{ sitter.email }</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    );

  }

}

export default SitterDisplay;
