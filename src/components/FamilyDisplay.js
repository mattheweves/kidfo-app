import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import FamilyProfile from './FamilyProfile';

class FamilyDisplay extends React.Component {

  render() {
    const { family, getFamily } = this.props;

    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">

        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s6">
              <img src={family.image.url} alt="" className="responsive-img"></img>
            </div>
            <div className="col s6 left-align">
              <span className="black-text left-align" onClick={() => getFamily(family.id)}>
              <h5><Link to={`families/${family.id}`}>
                  The { family.name } Family
                  </Link>
              </h5><br />
                Parents: { family.parents[0] && family.parents[0].first_name + " " + family.parents[0].last_name }
                         { family.parents[1] && " and " + family.parents[1].first_name + " " + family.parents[1].last_name }
                <p>{family.kids.length} Kids</p>
              </span>
            </div>
          </div>
        </div>

      </div>
      );
    }
  }


export default FamilyDisplay;
