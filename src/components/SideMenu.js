import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';


class SideMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    const { hasFamily, user, signedIn, signOut } = this.props;
    if(signedIn) {
    return (
        <Menu>
        <span className="brand-logo side-menu">KIDFO</span><br /><br />
          { hasFamily ?
            <div>
              <Link to="/kids/new"><i className="material-icons">person_pin</i>Add A Kid</Link><br />
              <Link to="/myfamily/edit"><i className="material-icons">mode_edit</i>Edit My Family</Link><br />
              <a href="#modalspouse"><i className="material-icons">email</i>Invite Spouse/Partner</a><br />
              <a href="#modalsitter"><i className="material-icons">email</i>Invite Sitter</a><br />
            </div>
            :
            <li><Link to="/myfamily/enable"><i className="material-icons">supervisor_account</i>Enable Family Account</Link></li>
          }
          <li><Link to="/profile/edit"><i className="material-icons">settings</i>  Edit My Profile</Link></li>
          <li><Link to="/" onClick={() => signOut()}><i className="material-icons">settings_power</i> Sign Out</Link></li>
      </Menu>
    );
  }
  else {
    return null;
  }
  }
}


export default SideMenu;
