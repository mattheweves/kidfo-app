import React from 'react';
import Kids from './containers/Kids';

class FamilyProfile extends React.Component {

    

    render () {
    const { family } = this.props;
    const showParents = "true";


    return (
      <div>
        <div className="row">
          <div className="col s12" >
            <div className="col s2">
              <img src={family.image.url} alt="" className="circle responsive-img"></img>
            </div>
            <div className="col s6 offset-s3">
                <h3>{family.name}</h3>
                { showParents === "true" ?
                   family.parents.map((p, index) => {
                      return(
                        <div>{p.first_name} {p.last_name}</div>
                      );
                    })
                     :
                     ""
               }
                <p>{family.kids.length} Kids</p>
            </div>
          </div>
        </div>

      </div>
    );

  }

}

export default FamilyProfile;
