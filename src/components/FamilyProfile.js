import React from 'react';
import KidDisplay from './KidDisplay';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';


class FamilyProfile extends React.Component {

    render () {
    const { family } = this.props;
    const showParents = "true";
    var kids = family.kids.map((kid, index) => {
                     return(
                       <KidDisplay
                         key={index}
                         index={index}
                         kid={kid}
                       />
                     );
                   });
    return (
      <Router>
      <div>
        <div className="row">
          <div className="col s12" >
            <div className="col 6">
              <img src={family.image.url} alt="" className="responsive-img"></img>
            </div>
            <div className="col s6 offset-s3">
                <h5>The {family.name} Family</h5>
                { showParents === "true" ?
                   family.parents.map((p, index) => {
                      return(
                        <div>{p.first_name} {p.last_name}</div>
                      );
                    })
                     :
                     ""
               }
            </div>
          </div>
        </div>
        { kids }
      </div>
      </Router>
    );
  }
}

export default FamilyProfile;
