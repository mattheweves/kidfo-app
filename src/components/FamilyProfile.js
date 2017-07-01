import React from 'react';
import KidDisplay from './KidDisplay';


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
      <div>
        <div className="row">
          <div className="col s12" >
            <div className="col 6">
              <img src={family.image.url} alt="" className="responsive-img"></img>
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
        { kids }
      </div>
    );

  }

}

export default FamilyProfile;
