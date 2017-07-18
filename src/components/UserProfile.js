import React from 'react';

class UserProfile extends React.Component {


    render () {
    const { user } = this.props;
    return (
      <div>
          <div className="row">
            <div className="col s10 offset-s1">
              { user.image && user.image.url ? <img src={user.image.url} alt="" className="profile-img circle responsive-img"></img>
                :
                <img src="/img/userplaceholder.png" alt="" className="profile-img circle responsive-img"></img>
               }
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
                <h4>{user.first_name} {user.last_name}</h4>
                <b>Motto:</b> <i>{user.motto}</i>
                <p>Email: {user.email}<br />Phone: {user.phone_number}</p>
            </div>
        </div>
      </div>
    );

  }

}

export default UserProfile;
