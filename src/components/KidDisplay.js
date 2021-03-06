import React from 'react';
import KidProfile from '../components/KidProfile';

import { BrowserRouter as Router, Route, Link, BrowserHistory, Redirect } from 'react-router-dom';


class KidDisplay extends React.Component {

  render() {

    const { kid, myKid, getKid, deleteKid, editKid } = this.props;

    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card-panel grey lighten-5 z-depth-1">
            <div className="row valign-wrapper">
            <div className="col s4 l4">
              {kid.image && kid.image.url ?
                  <img src={kid.image.url} alt="" className="kid-img circle responsive-img"></img>
                   :
                  <img src="/img/userplaceholder.png" alt="" className="kid-img circle responsive-img"></img>
              }
            </div>
            <div className="col s4 l4 left-align">
              <span className="black-text left-align" onClick={() => getKid(kid.id)}>
               <h5><Link to={`/kids/${kid.id}`}>
                  { kid.name }
                  </Link>
                </h5><br />
                { kid.birthdate }
              </span>
            </div>
            { myKid ?
            <div className="col s4 l4">
              <span className="note-card-edit" onClick={() => editKid(kid)}>
                <i className="material-icons">mode_edit</i>
              </span>
              <span className="note-card-edit" onClick={() => deleteKid(kid.id)}>
                <i className="material-icons">delete</i>
              </span>
            </div>
            :
            ""
           }
           </div>
          </div>
        </div>
      </div>

    );

  }

}

export default KidDisplay;
