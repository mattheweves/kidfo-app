import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import FamilyProfile from './FamilyProfile';

class MyFamilyDisplay extends React.Component {

  render() {

    const { family, getFamily, editMyFamily } = this.props;
    const showParents = "true";

    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card-panel grey lighten-4 z-depth-1">
          <div className="col s8 offset-s2">
            {family.image ? <img src={family.image.url} alt="" className="responsive-img"></img>: "" }
          </div>
          <div className="row valign-wrapper">
            <div className="col s6 left-align">
              <div><h5>The { family.name } Family</h5></div>
              <br />
              Parents: { showParents === "true" && family.parents ?
                 family.parents.map((p, index) => {
                    return(
                      <div>{p.first_name} {p.last_name}</div>
                    );
                  })
                   :
                   ""
             }
            </div>
            <div className="col s4">
              <span className="right-align" onClick={() => editMyFamily()}>
                <Link to="/myfamily/edit"><i className="material-icons">mode_edit</i>Edit My Family</Link>
              </span>
            </div>
          </div>
        </div>

        <div className="row">
           <div className="col s12 m6">
             <div className="card blue-grey darken-1">
               <div className="card-content medical white-text">
                 <span className="card-title">Medical / Health Card Info</span>
                   <p>Health Insurance: {family.insuranceprovider}<br />
                   Enrolee ID: {family.health_ins_enrollee_id}<br />
                   Group #: {family.health_ins_group_num}<br />
                   Physician Name: {family.physicianname}<br />
                   Physician Phone: {family.physicianphone}<br /></p>
               </div>
             </div>
           </div>
           <div className="col s12 m6">
             <div className="card blue-grey darken-1">
               <div className="card-content medical white-text">
                 <span className="card-title">Emergency Contacts</span>
                   <p>{family.emerg_contact_1}<br />
                   {family.emerg_contact_1_phone}<br />
                   {family.emerg_contact_2}<br />
                   {family.emerg_contact_2_phone}<br /></p>
               </div>
             </div>
           </div>
        </div>


      </div>

    );

  }

}

export default MyFamilyDisplay;
