import React from 'react';

class KidProfile extends React.Component {


    render () {
    const { kid, family } = this.props;

    return (
      <div>
        <div className="row">
        <div className="row">
          <div className="col s4 l6 m6 offset-l3 offset-m3 offset-s4">
          <br />
            { kid.image ? <img className="kid-img circle responsive-img" src={kid.image.url} ></img> : "" }
          </div>
          </div>
          <div className="col s12" >
            <div className="col s6 offset-s3">
                <h3>{kid.name}</h3>
                Born: {kid.birthdate}, Gender: {kid.gender}<br />
            </div>
          </div>
        </div>
        <ul className="collection medical">
            <li className="collection-item">EAT</li>
            <li className="collection-item">
                <div className="col s12">
                    Allergies: {kid.allergies}
                </div>
                <div className="col s12">
                    Eat Details:  {kid.eatdetails}
                </div>
            </li>
            <li className="collection-item">SLEEP</li>
            <li className="collection-item">
                <div className="col s12">
                    Bed Time:{kid.bedtime}
                </div>
                <div className="col s12">
                    Sleep Routine: {kid.sleeproutine}
                </div>
            </li>
            <li className="collection-item">NONOS</li>
            <li className="collection-item">
            <div className="col s12">
                {kid.nonos}
            </div>
            </li>
        </ul>

          <div className="row">
             <div className="col s12 m6">
               <div className="card blue-grey darken-1">
                 <div className="card-content medical white-text">
                   <span className="card-title">Medical / Health Card</span>
                     <p>Health Insurance: {kid.family.insuranceprovider}<br />
                     Enrolee ID: {kid.family.health_ins_enrollee_id}<br />
                     Group #: {kid.family.health_ins_group_num}<br />
                     Physician Name: {kid.family.physicianname}<br />
                     Physician Phone: {kid.family.physicianphone}<br /></p>
                 </div>
               </div>
             </div>
             <div className="col s12 m6">
               <div className="card blue-grey darken-1">
                 <div className="card-content medical white-text">
                   <span className="card-title">Emergency Contacts</span>
                     <p>{kid.family.emerg_contact_1}<br />
                     {kid.family.emerg_contact_1_phone}<br />
                     {kid.family.emerg_contact_2}<br />
                     {kid.family.emerg_contact_2_phone}<br /></p>
                 </div>
               </div>
             </div>
          </div>


    </div>
    );

  }

}

export default KidProfile;
