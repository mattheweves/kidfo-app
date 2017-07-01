import React from 'react';

class UserProfile extends React.Component {


    render () {
    const { user } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12" >
            <div className="col s4 offset-s2">
              <img src={user.image_url} alt="" className="responsive-img"></img>
            </div>
            <div className="col s6">
                <h3>{user.first_name}</h3>
                <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default UserProfile;
