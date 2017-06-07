import React from 'react';

class KidProfile extends React.Component {


    render () {
    const { kid } = this.props;


    return (
      <div>
        <div className="row">
          <div className="col s12" >
            <div className="row">
             <br />
              <img className="responsive-img circle col s4 offset-s4" src="http://i.pravatar.cc/150?img=46"></img>
            </div>
            <div className="col s6 offset-s3">
                <h3>{kid.name}</h3>
                Born: {kid.birthdate}, Gender: {kid.gender}
            </div>
          </div>
        </div>
        <ul className="collection">
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
        </div>
    );

  }

}

export default KidProfile;
