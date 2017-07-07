import React from 'react';

class UserProfile extends React.Component {


    render () {
    const { user } = this.props;
    return (
      <div>
          <div className="row">
            <div className="col s4 offset-s4">
              { user.image ? <img src={user.image.url} alt="" className="circle responsive-img"></img> : "" }
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
                <h3>{user.first_name} {user.last_name}</h3>
                Parenting Motto: <i>{user.motto}</i>
                <p>Email: {user.email}<br />Phone: {user.phone_number}</p>
            </div>
        </div>
      </div>
    );

  }

}

export default UserProfile;
