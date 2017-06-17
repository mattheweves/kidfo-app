import React from 'react';
import Kids from './containers/Kids';

class FamilyProfile extends React.Component {


    render () {
    const { family } = this.props;


    return (
      <div>
        <div className="row">
          <div className="col s12" >
            <div className="row">
             <br />
              <img className="responsive-img circle col s4 offset-s4" src="http://i.pravatar.cc/150?img=46"></img>
            </div>
            <div className="col s6 offset-s3">
                <h3>{family.name}</h3>
                Parents: { family.parents[0].first_name } { family.parents[0].last_name }< br/>
                         { family.parents[1].first_name } { family.parents[1].last_name }< br/>

                <p>{family.kids.length} Kids</p>
            </div>
          </div>
        </div>

      </div>
    );

  }

}

export default FamilyProfile;
