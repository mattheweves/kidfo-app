import React from 'react';
import KidProfile from '../components/KidProfile';

import { BrowserRouter as Router, Route, Link, BrowserHistory, Redirect } from 'react-router-dom';


class KidDisplay extends React.Component {

  render() {

    const { kid, getKid, deleteKid, editKid } = this.props;

    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s2">
              {kid.image ? <img src={kid.image.url} alt="" className="circle responsive-img"></img>: "" }
            </div>
            <div className="col s6 left-align">
              <span className="black-text left-align" onClick={() => getKid(kid.id)}>
               <h5>
                { kid.name }
                </h5><br />
                { kid.birthdate }
              </span>
            </div>
            <div className="col s4">
              <span className="note-card-edit" onClick={() => editKid(kid)}>
                <i className="material-icons">mode_edit</i>
              </span>
              <span className="note-card-edit" onClick={() => deleteKid(kid.id)}>
                <i className="material-icons">delete</i>
              </span>
            </div>
          </div>
        </div>
      </div>

    );

  }

}

export default KidDisplay;
